import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Background,
  ConnectionMode,
  MarkerType,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  applyNodeChanges,
  useReactFlow,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
  type OnEdgesChange,
  type OnNodesChange
} from '@xyflow/react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { Box, Button, FormControlLabel, Stack, Switch, Tooltip, Typography, useTheme } from '@mui/material';

import type { WorkflowFlowLayout, WorkflowFlowViewport, WorkflowStepDto } from '../../api/adminApi';
import { DEFAULT_FLOW_VIEWPORT } from '../../api/adminApi';
import { getStepActionLabel, hasPublishStepAction, SUCCESS_STEP_NONE } from '../../stepActions';
import WorkflowStepFlowNode, {
  WORKFLOW_STEP_NODE_HEIGHT,
  WORKFLOW_STEP_NODE_WIDTH,
  WorkflowStepFlowNodeData
} from './WorkflowStepFlowNode';
import { useReactFlowStyles } from './useReactFlowStyles';

export type FlowEditorStep = WorkflowStepDto & { clientKey: string };

export interface WorkflowStepsFlowViewProps {
  steps: FlowEditorStep[];
  flowLayout: WorkflowFlowLayout;
  initialFlowViewport?: WorkflowFlowViewport | null;
  selectedClientKey: string | null;
  onSelectStep(clientKey: string): void;
  onFlowLayoutChange(layout: WorkflowFlowLayout): void;
  onFlowViewportChange?(viewport: WorkflowFlowViewport): void;
  onTransitionChange(sourceClientKey: string, targetClientKeys: string[]): void;
  onAddStep(): void;
}

const NODE_TYPES = {
  workflowStep: WorkflowStepFlowNode
} as NodeTypes;

const NODE_GAP_X = 24;
const DEFAULT_ORIGIN = { x: 32, y: 48 };

const TRANSITION_EDGE_PREFIX = 'transition::';

function transitionEdgeId(sourceKey: string, targetKey: string): string {
  return `${TRANSITION_EDGE_PREFIX}${sourceKey}::${targetKey}`;
}

function parseTransitionEdgeId(edgeId: string): { sourceKey: string; targetKey: string } | null {
  if (!edgeId.startsWith(TRANSITION_EDGE_PREFIX)) {
    return null;
  }
  const body = edgeId.slice(TRANSITION_EDGE_PREFIX.length);
  const splitAt = body.indexOf('::');
  if (splitAt <= 0) {
    return null;
  }
  return {
    sourceKey: body.slice(0, splitAt),
    targetKey: body.slice(splitAt + 2)
  };
}

export function buildDefaultRowLayout(steps: FlowEditorStep[]): WorkflowFlowLayout {
  const layout: WorkflowFlowLayout = {};
  steps.forEach((step, index) => {
    layout[step.clientKey] = defaultPosition(index);
  });
  return layout;
}

function defaultPosition(index: number): { x: number; y: number } {
  return {
    x: DEFAULT_ORIGIN.x + index * (WORKFLOW_STEP_NODE_WIDTH + NODE_GAP_X),
    y: DEFAULT_ORIGIN.y
  };
}

function resolveSuccessTarget(
  step: FlowEditorStep,
  steps: FlowEditorStep[]
): FlowEditorStep | null {
  if (!hasPublishStepAction(step.actionType)) {
    return null;
  }
  const targetKey = step.actionSuccessStepClientKey || step.actionSuccessStepId;
  if (!targetKey || targetKey === SUCCESS_STEP_NONE) {
    return null;
  }
  return steps.find((candidate) => candidate.clientKey === targetKey || candidate.id === targetKey) ?? null;
}

function buildNodeData(step: FlowEditorStep, selectedClientKey: string | null): WorkflowStepFlowNodeData {
  return {
    label: step.name?.trim() || 'Untitled step',
    color: step.color || '',
    isTerminal: !!step.isTerminal,
    allowAddPackage: !!step.allowAddPackage,
    selected: selectedClientKey === step.clientKey
  };
}

function buildNodes(
  steps: FlowEditorStep[],
  flowLayout: WorkflowFlowLayout,
  selectedClientKey: string | null
): Node[] {
  return steps.map((step, index) => {
    const position = flowLayout[step.clientKey] ?? defaultPosition(index);
    return {
      id: step.clientKey,
      type: 'workflowStep',
      position,
      width: WORKFLOW_STEP_NODE_WIDTH,
      height: WORKFLOW_STEP_NODE_HEIGHT,
      data: buildNodeData(step, selectedClientKey),
      draggable: true,
      selectable: true,
      connectable: true
    };
  });
}

function stepOrderIndex(steps: FlowEditorStep[], clientKey: string): number {
  return steps.findIndex((step) => step.clientKey === clientKey);
}

function isBackwardTransition(steps: FlowEditorStep[], sourceKey: string, targetKey: string): boolean {
  const sourceIndex = stepOrderIndex(steps, sourceKey);
  const targetIndex = stepOrderIndex(steps, targetKey);
  if (sourceIndex < 0 || targetIndex < 0) {
    return false;
  }
  return targetIndex < sourceIndex;
}

function buildEdges(
  steps: FlowEditorStep[],
  transitionColor: string,
  actionColor: string,
  backwardColor: string,
  showBackwardArrows: boolean,
  labelBackground: string
): Edge[] {
  const edges: Edge[] = [];
  const stepByKey = new Map(steps.map((step) => [step.clientKey, step]));

  steps.forEach((step) => {
    const targets = step.transitionStepClientKeys ?? [];
    targets.forEach((targetKey) => {
      if (!stepByKey.has(targetKey) || targetKey === step.clientKey) {
        return;
      }
      const backward = isBackwardTransition(steps, step.clientKey, targetKey);
      if (backward && !showBackwardArrows) {
        return;
      }
      const strokeColor = backward ? backwardColor : transitionColor;
      edges.push({
        id: transitionEdgeId(step.clientKey, targetKey),
        source: step.clientKey,
        target: targetKey,
        sourceHandle: 'source',
        targetHandle: 'target',
        type: 'smoothstep',
        selectable: true,
        deletable: true,
        label: backward ? 'Move (back)' : 'Move',
        labelStyle: { fill: strokeColor, fontWeight: 700, fontSize: 13 },
        labelBgStyle: { fill: labelBackground, fillOpacity: 0.95 },
        labelBgPadding: [8, 4] as [number, number],
        labelBgBorderRadius: 4,
        style: {
          stroke: strokeColor,
          strokeWidth: backward ? 2.5 : 3,
          strokeDasharray: backward ? '10 6' : undefined
        },
        markerEnd: { type: MarkerType.ArrowClosed, color: strokeColor, width: 28, height: 28 },
        zIndex: backward ? 1 : 2
      });
    });

    const actionTarget = resolveSuccessTarget(step, steps);
    const actionLabel = getStepActionLabel(step.actionType);
    if (!actionTarget || !actionLabel) {
      return;
    }

    edges.push({
      id: `action-${step.clientKey}-${actionTarget.clientKey}`,
      source: step.clientKey,
      target: actionTarget.clientKey,
      sourceHandle: 'source',
      targetHandle: 'target',
      type: 'smoothstep',
      animated: true,
      selectable: false,
      deletable: false,
      label: actionLabel,
      labelStyle: { fill: actionColor, fontWeight: 700, fontSize: 12 },
      labelBgStyle: { fill: labelBackground, fillOpacity: 0.92 },
      labelBgPadding: [6, 4] as [number, number],
      labelBgBorderRadius: 4,
      style: { stroke: actionColor, strokeWidth: 2.5, strokeDasharray: '8 5' },
      markerEnd: { type: MarkerType.ArrowClosed, color: actionColor, width: 24, height: 24 },
      zIndex: 1
    });
  });

  return edges;
}

function layoutFromNodes(nodes: Node[]): WorkflowFlowLayout {
  const layout: WorkflowFlowLayout = {};
  nodes.forEach((node) => {
    layout[node.id] = { x: node.position.x, y: node.position.y };
  });
  return layout;
}

function FlowZoomToolbar({
  onResetRowLayout,
  onFlowViewportChange
}: {
  onResetRowLayout(): void;
  onFlowViewportChange?(viewport: WorkflowFlowViewport): void;
}) {
  const { zoomIn, zoomOut, setViewport, getViewport } = useReactFlow();

  const stopCanvasPointer = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Panel position="top-left">
      <Stack
        direction="row"
        spacing={0.5}
        onMouseDown={stopCanvasPointer}
        onPointerDown={stopCanvasPointer}
        sx={{
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          boxShadow: 1,
          p: 0.5,
          pointerEvents: 'all'
        }}
      >
        <Tooltip title="Zoom in">
          <Button
            size="small"
            variant="outlined"
            aria-label="Zoom in"
            onClick={() => {
              zoomIn({ duration: 150 });
              window.requestAnimationFrame(() => onFlowViewportChange?.(getViewport()));
            }}
          >
            +
          </Button>
        </Tooltip>
        <Tooltip title="Zoom out">
          <Button
            size="small"
            variant="outlined"
            aria-label="Zoom out"
            onClick={() => {
              zoomOut({ duration: 150 });
              window.requestAnimationFrame(() => onFlowViewportChange?.(getViewport()));
            }}
          >
            −
          </Button>
        </Tooltip>
        <Tooltip title="Reset zoom">
          <Button
            size="small"
            variant="outlined"
            aria-label="Reset zoom"
            onClick={() => {
              setViewport(DEFAULT_FLOW_VIEWPORT, { duration: 150 });
              window.requestAnimationFrame(() => onFlowViewportChange?.(getViewport()));
            }}
          >
            100%
          </Button>
        </Tooltip>
        <Tooltip title="Align steps in a horizontal row">
          <Button size="small" variant="contained" aria-label="Align steps in a row" onClick={onResetRowLayout}>
            Align row
          </Button>
        </Tooltip>
      </Stack>
    </Panel>
  );
}

function FlowDisplayToolbar({
  showBackwardArrows,
  onShowBackwardArrowsChange
}: {
  showBackwardArrows: boolean;
  onShowBackwardArrowsChange(checked: boolean): void;
}) {
  const stopCanvasPointer = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Panel position="top-right">
      <Stack
        direction="row"
        alignItems="center"
        onMouseDown={stopCanvasPointer}
        onPointerDown={stopCanvasPointer}
        sx={{
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          boxShadow: 1,
          px: 1,
          py: 0.25,
          pointerEvents: 'all'
        }}
      >
        <Tooltip title="Show return / backward Move arrows (display only; does not change saved transitions)">
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={showBackwardArrows}
                onChange={(_, checked) => onShowBackwardArrowsChange(checked)}
                inputProps={{ 'aria-label': 'Show backward arrows' }}
              />
            }
            label={
              <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                Backward arrows
              </Typography>
            }
            sx={{ m: 0, mr: 0.5 }}
          />
        </Tooltip>
      </Stack>
    </Panel>
  );
}

function FlowViewportInitializer({
  initialFlowViewport
}: {
  initialFlowViewport?: WorkflowFlowViewport | null;
}) {
  const { setViewport } = useReactFlow();
  const initialKey = JSON.stringify(initialFlowViewport ?? null);
  const appliedInitialKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (appliedInitialKeyRef.current === initialKey) {
      return;
    }
    appliedInitialKeyRef.current = initialKey;
    setViewport(initialFlowViewport ?? DEFAULT_FLOW_VIEWPORT, { duration: 0 });
  }, [initialKey, initialFlowViewport, setViewport]);

  return null;
}

function FlowCanvas({
  steps,
  flowLayout,
  initialFlowViewport,
  selectedClientKey,
  onSelectStep,
  onFlowLayoutChange,
  onFlowViewportChange,
  onTransitionChange,
  onAddStep
}: WorkflowStepsFlowViewProps) {
  const siteId = useActiveSiteId();
  useReactFlowStyles(siteId);
  const theme = useTheme();
  const transitionColor = theme.palette.text.secondary;
  const actionColor = theme.palette.primary.main;
  const backwardColor = theme.palette.warning.dark;
  const labelBackground = theme.palette.background.paper;
  const backgroundDotColor =
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300];
  const isDraggingRef = useRef(false);
  const [showBackwardArrows, setShowBackwardArrows] = React.useState(false);

  const stepKeys = useMemo(() => steps.map((step) => step.clientKey).join('|'), [steps]);
  const layoutKey = useMemo(() => JSON.stringify(flowLayout), [flowLayout]);
  const stepLabels = useMemo(
    () => steps.map((step) => `${step.clientKey}:${step.name}:${step.color}`).join('|'),
    [steps]
  );

  const [flowNodes, setFlowNodes] = React.useState<Node[]>(() =>
    buildNodes(steps, flowLayout, selectedClientKey)
  );

  const edges = useMemo(
    () =>
      buildEdges(
        steps,
        transitionColor,
        actionColor,
        backwardColor,
        showBackwardArrows,
        labelBackground
      ),
    [steps, transitionColor, actionColor, backwardColor, showBackwardArrows, labelBackground]
  );

  useEffect(() => {
    if (isDraggingRef.current) {
      return;
    }
    setFlowNodes(buildNodes(steps, flowLayout, selectedClientKey));
  }, [stepKeys, layoutKey, steps, flowLayout]);

  useEffect(() => {
    if (isDraggingRef.current) {
      return;
    }
    setFlowNodes((current) =>
      current.map((node) => ({
        ...node,
        selected: node.id === selectedClientKey,
        data: buildNodeData(
          steps.find((step) => step.clientKey === node.id) ?? {
            clientKey: node.id,
            name: String(node.data?.label ?? '')
          },
          selectedClientKey
        )
      }))
    );
  }, [selectedClientKey, stepLabels, steps]);

  const handleNodesChange: OnNodesChange = useCallback((changes) => {
    setFlowNodes((current) => applyNodeChanges(changes, current));
  }, []);

  const handleNodeDragStart = useCallback(() => {
    isDraggingRef.current = true;
  }, []);

  const handleNodeDragStop = useCallback(() => {
    isDraggingRef.current = false;
    setFlowNodes((current) => {
      onFlowLayoutChange(layoutFromNodes(current));
      return current;
    });
  }, [onFlowLayoutChange]);

  const handleResetRowLayout = useCallback(() => {
    onFlowLayoutChange(buildDefaultRowLayout(steps));
  }, [onFlowLayoutChange, steps]);

  const handleMoveEnd = useCallback(
    (_event: unknown, viewport: WorkflowFlowViewport) => {
      onFlowViewportChange?.(viewport);
    },
    [onFlowViewportChange]
  );

  const handleConnect = useCallback(
    (connection: Connection) => {
      const source = connection.source;
      const target = connection.target;
      if (!source || !target || source === target) {
        return;
      }
      const sourceStep = steps.find((step) => step.clientKey === source);
      if (!sourceStep) {
        return;
      }
      const existing = sourceStep.transitionStepClientKeys ?? [];
      if (existing.includes(target)) {
        return;
      }
      onTransitionChange(source, [...existing, target]);
    },
    [onTransitionChange, steps]
  );

  const handleEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      changes.forEach((change) => {
        if (change.type !== 'remove') {
          return;
        }
        const parsed = parseTransitionEdgeId(change.id);
        if (!parsed) {
          return;
        }
        const sourceStep = steps.find((step) => step.clientKey === parsed.sourceKey);
        if (!sourceStep) {
          return;
        }
        const nextTargets = (sourceStep.transitionStepClientKeys ?? []).filter(
          (key) => key !== parsed.targetKey
        );
        onTransitionChange(parsed.sourceKey, nextTargets);
      });
    },
    [onTransitionChange, steps]
  );

  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1.5,
        bgcolor: 'background.default',
        overflow: 'hidden'
      }}
    >
      <Box
        className="crafterwf-workflow-flow-canvas"
        sx={{
          height: { xs: 360, sm: 420 },
          maxHeight: 'min(50vh, 480px)',
          width: '100%',
          position: 'relative',
          touchAction: 'none',
          userSelect: 'none',
          '& .react-flow': {
            width: '100%',
            height: '100%',
            bgcolor: 'background.default'
          }
        }}
      >
        <ReactFlow
          nodes={flowNodes}
          edges={edges}
          nodeTypes={NODE_TYPES}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onNodeClick={(_, node) => onSelectStep(node.id)}
          onNodeDragStart={handleNodeDragStart}
          onNodeDragStop={handleNodeDragStop}
          onConnect={handleConnect}
          onMoveEnd={handleMoveEnd}
          nodesConnectable
          nodesDraggable
          elementsSelectable
          selectNodesOnDrag={false}
          panOnDrag
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch
          connectionMode={ConnectionMode.Loose}
          connectionRadius={48}
          deleteKeyCode={['Backspace', 'Delete']}
          defaultViewport={initialFlowViewport ?? DEFAULT_FLOW_VIEWPORT}
          minZoom={0.5}
          maxZoom={1.75}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            gap={24}
            size={1.5}
            color={backgroundDotColor}
            bgColor={theme.palette.background.default}
          />
          <FlowViewportInitializer initialFlowViewport={initialFlowViewport} />
          <FlowZoomToolbar
            onResetRowLayout={handleResetRowLayout}
            onFlowViewportChange={onFlowViewportChange}
          />
          <FlowDisplayToolbar
            showBackwardArrows={showBackwardArrows}
            onShowBackwardArrowsChange={setShowBackwardArrows}
          />
        </ReactFlow>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          px: 1.5,
          py: 1,
          borderTop: 1,
          borderColor: 'divider',
          flexWrap: 'wrap'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Drag steps to move. Connect via the blue dots. Use Align row to snap steps horizontally.
        </Typography>
        <Button size="small" startIcon={<AddRoundedIcon />} onClick={onAddStep}>
          Add step
        </Button>
      </Box>
    </Box>
  );
}

const WorkflowStepsFlowView = (props: WorkflowStepsFlowViewProps) => (
  <ReactFlowProvider>
    <FlowCanvas {...props} />
  </ReactFlowProvider>
);

export default WorkflowStepsFlowView;

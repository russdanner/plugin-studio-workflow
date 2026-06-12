import * as React from 'react';
import { memo } from 'react';
import { type NodeProps } from '@xyflow/react';
import { Chip, Typography } from '@mui/material';

import { resolveStepColor } from '../../colors';
import { Position, WorkflowFlowHandle } from './workflowFlowHandle';

export interface WorkflowStepFlowNodeData extends Record<string, unknown> {
  label: string;
  color: string;
  isTerminal: boolean;
  allowAddPackage: boolean;
  selected: boolean;
}

export const WORKFLOW_STEP_NODE_WIDTH = 340;
export const WORKFLOW_STEP_NODE_HEIGHT = 140;

const handleStyle: React.CSSProperties = {
  width: 20,
  height: 20,
  border: '3px solid #fff',
  background: '#2563eb',
  boxShadow: '0 1px 4px rgba(0,0,0,0.25)'
};

const WorkflowStepFlowNode = ({ data, selected }: NodeProps) => {
  const stepData = data as WorkflowStepFlowNodeData;
  const stepColor = resolveStepColor(stepData.color);
  const isSelected = selected || stepData.selected;

  return (
    <>
      <WorkflowFlowHandle type="target" position={Position.Left} id="target" style={handleStyle} />
      <div
        className="crafterwf-workflow-step-node"
        style={{
          width: WORKFLOW_STEP_NODE_WIDTH,
          minHeight: WORKFLOW_STEP_NODE_HEIGHT,
          boxSizing: 'border-box',
          borderRadius: 12,
          border: `3px solid ${isSelected ? '#1976d2' : '#cbd5e1'}`,
          borderTop: `8px solid ${stepColor}`,
          background: '#ffffff',
          opacity: 1,
          boxShadow: '0 4px 14px rgba(15, 23, 42, 0.12)',
          padding: '16px 18px',
          cursor: 'grab',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ fontSize: '1.15rem', lineHeight: 1.3, pr: 1 }}>
          {stepData.label}
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
          {stepData.isTerminal ? (
            <Chip label="Terminal" size="medium" sx={{ height: 28, fontSize: '0.8rem' }} />
          ) : null}
          {stepData.allowAddPackage ? (
            <Chip label="+ Package" size="medium" sx={{ height: 28, fontSize: '0.8rem' }} />
          ) : null}
        </div>
      </div>
      <WorkflowFlowHandle type="source" position={Position.Right} id="source" style={handleStyle} />
    </>
  );
};

export default memo(WorkflowStepFlowNode);

import * as React from 'react';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';

import { ApiResponse, ApiResponseErrorState } from '@craftercms/studio-ui';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { saveWorkflowDefinition, getPublishingTargets, WorkflowDetail, WorkflowStepDto } from '../../api/adminApi';
import {
  BOARD_BACKGROUND_SWATCHES,
  normalizeBoardBackgroundId,
  normalizeStepColorId,
  resolveStepColor,
  STEP_COLOR_SWATCHES
} from '../../colors';
import ColorSwatchPicker from '../ColorSwatchPicker';
import { STEP_NAME_MAX_LENGTH, WORKFLOW_NAME_MAX_LENGTH } from '../../consts';
import { resolveBoardBackgroundColor } from '../../colors';
import {
  normalizeStepActionType,
  PUBLISH_ACTION_OPTIONS,
  STEP_ACTION_NONE,
  SUCCESS_STEP_NONE,
  StepActionType,
  stepActionTypeFromLegacy
} from '../../stepActions';
import { defaultContentRule, defaultRoleRule } from '../../stepRules';
import WorkflowStepRulesDialog from './WorkflowStepRulesDialog';

type EditorStep = WorkflowStepDto & { clientKey: string };

export interface WorkflowEditorDialogProps {
  open: boolean;
  detail: WorkflowDetail;
  onClose(): void;
  onSaved(): void;
}

function reorderSteps(steps: EditorStep[], from: number, to: number): EditorStep[] {
  const next = steps.slice();
  const [removed] = next.splice(from, 1);
  next.splice(to, 0, removed);
  return next;
}

function mapDetailSteps(steps: WorkflowStepDto[]): EditorStep[] {
  const mapped = (steps || []).map((step, index) => {
    const actionType = normalizeStepActionType(step.actionType);
    const resolvedAction =
      actionType !== STEP_ACTION_NONE ? actionType : stepActionTypeFromLegacy(step);
    return {
      ...step,
      clientKey: step.id || `existing-${index}`,
      color: normalizeStepColorId(step.color),
      isTerminal: !!step.isTerminal,
      allowAddPackage: step.allowAddPackage === true,
      actionType: resolvedAction
    };
  });

  mapped.forEach((step) => {
    if (step.actionSuccessStepId) {
      const target = mapped.find((candidate) => candidate.id === step.actionSuccessStepId);
      if (target) {
        step.actionSuccessStepClientKey = target.clientKey;
      }
    }
  });

  return mapped;
}

const WorkflowEditorDialog = ({ open, detail, onClose, onSaved }: WorkflowEditorDialogProps) => {
  const siteId = useActiveSiteId();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [boardBackground, setBoardBackground] = useState(BOARD_BACKGROUND_SWATCHES[0].id);
  const [steps, setSteps] = useState<EditorStep[]>([]);
  const [stagingEnabled, setStagingEnabled] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<ApiResponse>();
  const [validationError, setValidationError] = useState<string | null>(null);
  const [rulesStepIndex, setRulesStepIndex] = useState<number | null>(null);

  useEffect(() => {
    if (open && detail) {
      setName(detail.workflow.name || '');
      setDescription(detail.workflow.description || '');
      setBoardBackground(
        normalizeBoardBackgroundId(detail.workflow.backgroundColor || detail.workflow.backgroundUrl)
      );
      setSteps(mapDetailSteps(detail.steps || []));
      setError(undefined);
      setValidationError(null);
    }
  }, [open, detail]);

  useEffect(() => {
    if (!open || !siteId) {
      return;
    }
    getPublishingTargets(siteId).subscribe({
      next(response) {
        setStagingEnabled(!!response.response?.result?.stagingEnabled);
      },
      error() {
        setStagingEnabled(false);
      }
    });
  }, [open, siteId]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    setSteps(reorderSteps(steps, result.source.index, result.destination.index));
  };

  const handleAddStep = () => {
    setSteps([
      ...steps,
      {
        clientKey: `new-${Date.now()}-${Math.random()}`,
        name: 'New Step',
        color: STEP_COLOR_SWATCHES[0].id,
        isTerminal: false,
        allowAddPackage: false,
        actionType: STEP_ACTION_NONE
      }
    ]);
  };

  const handleRemoveStep = (index: number) => {
    if (steps.length <= 1) {
      setValidationError('A workflow must have at least one step.');
      return;
    }
    setValidationError(null);
    const removedKey = steps[index].clientKey;
    setSteps(
      steps
        .filter((_, i) => i !== index)
        .map((step) =>
          step.actionSuccessStepClientKey === removedKey
            ? { ...step, actionSuccessStepClientKey: undefined, actionSuccessStepId: undefined }
            : step
        )
    );
  };

  const updateStep = (index: number, patch: Partial<WorkflowStepDto>) => {
    setSteps(steps.map((step, i) => (i === index ? { ...step, ...patch } : step)));
  };

  const handleActionTypeChange = (index: number, actionType: StepActionType) => {
    const patch: Partial<EditorStep> = { actionType };
    if (actionType === STEP_ACTION_NONE) {
      patch.actionSuccessStepClientKey = undefined;
      patch.actionSuccessStepId = undefined;
    } else {
      const current = steps[index];
      if (!current.actionSuccessStepClientKey && !current.actionSuccessStepId) {
        const nextStep = steps[index + 1];
        if (nextStep) {
          patch.actionSuccessStepClientKey = nextStep.clientKey;
        }
      }
    }
    updateStep(index, patch);
  };

  const handleSave = () => {
    if (!name.trim()) {
      setValidationError('Workflow name is required.');
      return;
    }
    if (steps.some((step) => !step.name?.trim())) {
      setValidationError('Every step needs a name.');
      return;
    }
    if (steps.some((step) => (step.name?.trim().length ?? 0) > STEP_NAME_MAX_LENGTH)) {
      setValidationError(`Step names must be ${STEP_NAME_MAX_LENGTH} characters or fewer.`);
      return;
    }
    if (!siteId) {
      setValidationError('No active site selected.');
      return;
    }

    setValidationError(null);
    setSaving(true);
    setError(undefined);
    saveWorkflowDefinition(siteId, detail.workflow.id, {
      workflow: {
        ...detail.workflow,
        name: name.trim(),
        description: description.trim(),
        backgroundColor: boardBackground
      },
      steps: steps.map((step, index) => ({
        id: step.id,
        clientKey: step.clientKey,
        name: step.name.trim(),
        color: normalizeStepColorId(step.color),
        isTerminal: !!step.isTerminal,
        allowAddPackage: !!step.allowAddPackage,
        actionType:
          !step.actionType || step.actionType === STEP_ACTION_NONE ? STEP_ACTION_NONE : step.actionType,
        actionSuccessStepId: step.actionSuccessStepId,
        actionSuccessStepClientKey: step.actionSuccessStepClientKey,
        roleRule: step.roleRule,
        contentRule: step.contentRule,
        position: (index + 1) * 1000
      }))
    }).subscribe({
      next: () => {
        setSaving(false);
        onSaved();
      },
      error(e) {
        console.error(e);
        setSaving(false);
        setError(
          e.response?.response ?? ({ code: '?', message: 'Unable to save workflow.' } as ApiResponse)
        );
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 'min(96vw, 1200px)' },
          height: { xs: '100%', sm: 'calc(100vh - 48px)' },
          maxHeight: { xs: '100%', sm: 'calc(100vh - 24px)' },
          m: { xs: 0, sm: 2 },
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <DialogTitle sx={{ flexShrink: 0 }}>Edit workflow</DialogTitle>
      <DialogContent dividers sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {validationError && (
          <Alert severity="warning" onClose={() => setValidationError(null)}>
            {validationError}
          </Alert>
        )}
        {error && <ApiResponseErrorState error={error} />}

        <Stack spacing={2} sx={{ flexShrink: 0 }}>
          <TextField
            label="Workflow name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            inputProps={{ maxLength: WORKFLOW_NAME_MAX_LENGTH }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            minRows={2}
          />
          <Stack direction="row" alignItems="center" spacing={1.5} flexWrap="wrap">
            <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
              Board background
            </Typography>
            <ColorSwatchPicker
              swatches={BOARD_BACKGROUND_SWATCHES}
              value={boardBackground}
              onChange={setBoardBackground}
              resolveColor={resolveBoardBackgroundColor}
              size={24}
            />
          </Stack>
        </Stack>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Steps
          </Typography>
          <Button size="small" startIcon={<AddRoundedIcon />} onClick={handleAddStep}>
            Add step
          </Button>
        </Box>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="workflow-steps">
            {(provided) => (
              <Stack
                spacing={1}
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{ flex: 1, minHeight: 0, overflowY: 'auto', pr: 0.5 }}
              >
                {steps.map((step, index) => {
                  const hasAction = !!step.actionType && step.actionType !== STEP_ACTION_NONE;
                  const successValue =
                    step.actionSuccessStepClientKey || step.actionSuccessStepId || SUCCESS_STEP_NONE;
                  const successOptions = steps.filter((candidate) => candidate.clientKey !== step.clientKey);

                  return (
                    <Draggable key={step.clientKey} draggableId={step.clientKey} index={index}>
                      {(dragProvided) => (
                        <Box
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          sx={(theme) => ({
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            p: 1.25,
                            pl: 1,
                            borderRadius: 1,
                            border: `1px solid ${theme.palette.divider}`,
                            borderLeft: `4px solid ${resolveStepColor(step.color)}`,
                            bgcolor: 'background.paper'
                          })}
                        >
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Box {...dragProvided.dragHandleProps} sx={{ color: 'text.secondary', flexShrink: 0 }}>
                              <DragIndicatorRoundedIcon />
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                flex: 1,
                                minWidth: 0,
                                alignItems: 'center',
                                gap: 1.5,
                                flexWrap: { xs: 'wrap', md: 'nowrap' }
                              }}
                            >
                              <TextField
                                label="Step name"
                                value={step.name}
                                onChange={(e) => updateStep(index, { name: e.target.value })}
                                size="small"
                                inputProps={{ maxLength: STEP_NAME_MAX_LENGTH }}
                                sx={{ width: { xs: '100%', sm: 200, md: 220 }, flexShrink: 0 }}
                              />
                              <ColorSwatchPicker
                                label="Color"
                                swatches={STEP_COLOR_SWATCHES}
                                value={normalizeStepColorId(step.color)}
                                onChange={(color) => updateStep(index, { color })}
                                size={22}
                              />
                              <FormControlLabel
                                sx={{ m: 0, flexShrink: 0 }}
                                control={
                                  <Checkbox
                                    size="small"
                                    checked={!!step.isTerminal}
                                    onChange={(e) => updateStep(index, { isTerminal: e.target.checked })}
                                  />
                                }
                                label="Terminal"
                              />
                              <FormControlLabel
                                sx={{ m: 0, flexShrink: 0 }}
                                control={
                                  <Checkbox
                                    size="small"
                                    checked={!!step.allowAddPackage}
                                    onChange={(e) => updateStep(index, { allowAddPackage: e.target.checked })}
                                  />
                                }
                                label="Allow add package"
                              />
                            </Box>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<RuleRoundedIcon />}
                              onClick={() => setRulesStepIndex(index)}
                              sx={{ flexShrink: 0 }}
                            >
                              Rules
                            </Button>
                            <IconButton
                              aria-label="Remove step"
                              onClick={() => handleRemoveStep(index)}
                              sx={{ alignSelf: 'center' }}
                            >
                              <DeleteOutlineRoundedIcon />
                            </IconButton>
                          </Box>

                          <Box sx={{ pl: 4.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <RadioGroup
                              value={step.actionType || STEP_ACTION_NONE}
                              onChange={(event) =>
                                handleActionTypeChange(index, event.target.value as StepActionType)
                              }
                            >
                              <FormControlLabel
                                value={STEP_ACTION_NONE}
                                control={<Radio size="small" />}
                                label="None"
                                sx={{ mb: 0.5 }}
                              />
                              <FormControl component="fieldset" variant="standard" sx={{ mt: 0.5 }}>
                                <FormLabel component="legend" sx={{ typography: 'caption', color: 'text.secondary' }}>
                                  Publish Actions
                                </FormLabel>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, pl: 0.5, pt: 0.25 }}>
                                  {PUBLISH_ACTION_OPTIONS.map((option) => (
                                    <FormControlLabel
                                      key={option.value}
                                      value={option.value}
                                      control={<Radio size="small" />}
                                      label={option.label}
                                      disabled={option.requiresStaging && !stagingEnabled}
                                      sx={{ mr: 1.5 }}
                                    />
                                  ))}
                                </Box>
                              </FormControl>
                            </RadioGroup>

                            <FormControl size="small" sx={{ maxWidth: 320 }} disabled={!hasAction}>
                              <InputLabel id={`success-step-label-${step.clientKey}`}>Step on success</InputLabel>
                              <Select
                                labelId={`success-step-label-${step.clientKey}`}
                                label="Step on success"
                                value={successValue}
                                renderValue={(selected) => {
                                  if (selected === SUCCESS_STEP_NONE) {
                                    return 'None — stay on current step';
                                  }
                                  const target = successOptions.find(
                                    (candidate) =>
                                      candidate.clientKey === selected || candidate.id === selected
                                  );
                                  return target?.name?.trim() || 'Untitled step';
                                }}
                                onChange={(event) => {
                                  const value = event.target.value as string;
                                  if (value === SUCCESS_STEP_NONE) {
                                    updateStep(index, {
                                      actionSuccessStepClientKey: undefined,
                                      actionSuccessStepId: undefined
                                    });
                                  } else {
                                    updateStep(index, {
                                      actionSuccessStepClientKey: value,
                                      actionSuccessStepId: undefined
                                    });
                                  }
                                }}
                              >
                                <MenuItem value={SUCCESS_STEP_NONE}>None — stay on current step</MenuItem>
                                {successOptions.map((candidate) => (
                                  <MenuItem key={candidate.clientKey} value={candidate.clientKey}>
                                    {candidate.name?.trim() || 'Untitled step'}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                        </Box>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </DialogContent>
      {rulesStepIndex != null && steps[rulesStepIndex] && (
        <WorkflowStepRulesDialog
          open
          stepName={steps[rulesStepIndex].name?.trim() || 'Step'}
          roleRule={steps[rulesStepIndex].roleRule ?? defaultRoleRule()}
          contentRule={steps[rulesStepIndex].contentRule ?? defaultContentRule()}
          onClose={() => setRulesStepIndex(null)}
          onSave={(roleRule, contentRule) => {
            updateStep(rulesStepIndex, { roleRule, contentRule });
            setRulesStepIndex(null);
          }}
        />
      )}
      <DialogActions sx={{ flexShrink: 0, px: 2, py: 1.5 }}>
        <Button onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save workflow'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkflowEditorDialog;

import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { fetchAll as fetchAllGroups } from '@craftercms/studio-ui/services/groups';
import {
  defaultContentRule,
  defaultRoleRule,
  StepContentRule,
  StepContentRuleMode,
  StepRoleRule,
  StepRoleRuleMode
} from '../../stepRules';

export interface WorkflowStepRulesDialogProps {
  open: boolean;
  stepName: string;
  roleRule: StepRoleRule;
  contentRule: StepContentRule;
  onClose(): void;
  onSave(roleRule: StepRoleRule, contentRule: StepContentRule): void;
}

type GroupOption = { id: number; name: string };

const WorkflowStepRulesDialog = ({
  open,
  stepName,
  roleRule: initialRoleRule,
  contentRule: initialContentRule,
  onClose,
  onSave
}: WorkflowStepRulesDialogProps) => {
  const [roleMode, setRoleMode] = useState<StepRoleRuleMode>('all');
  const [roleSelections, setRoleSelections] = useState<string[]>([]);
  const [contentMode, setContentMode] = useState<StepContentRuleMode>('all');
  const [pathPatterns, setPathPatterns] = useState('');
  const [contentTypes, setContentTypes] = useState('');
  const [groupOptions, setGroupOptions] = useState<GroupOption[]>([]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const role = initialRoleRule ?? defaultRoleRule();
    const content = initialContentRule ?? defaultContentRule();
    setRoleMode(role.mode);
    setRoleSelections(role.roles ?? []);
    setContentMode(content.mode);
    setPathPatterns((content.pathPatterns ?? []).join('\n'));
    setContentTypes((content.contentTypes ?? []).join('\n'));
  }, [open, initialRoleRule, initialContentRule]);

  useEffect(() => {
    if (!open) {
      return;
    }
    fetchAllGroups({ limit: 500, offset: 0 }).subscribe({
      next(groups) {
        const mapped = (groups as Array<{ id?: number; name?: string; groupName?: string }>)
          .map((group) => ({
            id: Number(group.id),
            name: (group.name || group.groupName || '').trim()
          }))
          .filter((group) => group.name && group.id != null && !Number.isNaN(group.id));
        setGroupOptions(mapped);
      },
      error() {
        setGroupOptions([]);
      }
    });
  }, [open]);

  const selectedGroupOptions = useMemo(
    () =>
      roleSelections
        .map((name) => groupOptions.find((g) => g.name === name))
        .filter((group): group is GroupOption => !!group),
    [roleSelections, groupOptions]
  );

  const parseMultiline = (value: string): string[] =>
    value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

  const handleSave = () => {
    onSave(
      {
        mode: roleMode,
        roles: roleMode === 'all' ? [] : roleSelections
      },
      {
        mode: contentMode,
        pathPatterns: contentMode === 'all' ? [] : parseMultiline(pathPatterns),
        contentTypes: contentMode === 'all' ? [] : parseMultiline(contentTypes)
      }
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Step rules — {stepName}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2.5}>
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Roles
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Controls which Studio groups can move a package into this step.
            </Typography>
            <FormControl component="fieldset" variant="standard">
              <RadioGroup value={roleMode} onChange={(e) => setRoleMode(e.target.value as StepRoleRuleMode)}>
                <FormControlLabel value="all" control={<Radio size="small" />} label="All roles" />
                <FormControlLabel value="include" control={<Radio size="small" />} label="Include only these roles" />
                <FormControlLabel value="exclude" control={<Radio size="small" />} label="Exclude these roles" />
              </RadioGroup>
            </FormControl>
            {roleMode !== 'all' && (
              <Autocomplete<GroupOption, true, false, false>
                multiple
                options={groupOptions}
                value={selectedGroupOptions}
                onChange={(_, value) => setRoleSelections(value.map((entry) => entry.name))}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(a, b) => a.name === b.name}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip {...getTagProps({ index })} key={option.name} label={option.name} size="small" />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={roleMode === 'include' ? 'Allowed roles' : 'Excluded roles'}
                    placeholder="Select Studio groups"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}
              />
            )}
          </Box>

          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Content
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Every content item attached to the package must match at least one path pattern or content type when
              restricted.
            </Typography>
            <FormControl component="fieldset" variant="standard">
              <RadioGroup value={contentMode} onChange={(e) => setContentMode(e.target.value as StepContentRuleMode)}>
                <FormControlLabel value="all" control={<Radio size="small" />} label="All content" />
                <FormControlLabel
                  value="any"
                  control={<Radio size="small" />}
                  label="Only matching paths or content types"
                />
              </RadioGroup>
            </FormControl>
            {contentMode === 'any' && (
              <Stack spacing={1.5} sx={{ mt: 1 }}>
                <TextField
                  label="Path patterns"
                  value={pathPatterns}
                  onChange={(e) => setPathPatterns(e.target.value)}
                  multiline
                  minRows={3}
                  placeholder={'/site/website/**\n/static-assets/images/**'}
                  helperText="One pattern per line. Use * and ** wildcards."
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Content types"
                  value={contentTypes}
                  onChange={(e) => setContentTypes(e.target.value)}
                  multiline
                  minRows={2}
                  placeholder={'/page/home\n/component/hero'}
                  helperText="One content type per line (e.g. /page/article)."
                  fullWidth
                  size="small"
                />
              </Stack>
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkflowStepRulesDialog;

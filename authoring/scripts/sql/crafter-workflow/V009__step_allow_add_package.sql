ALTER TABLE wf_workflow_step ADD COLUMN allow_add_package TINYINT(1) NOT NULL DEFAULT 0;

UPDATE wf_workflow_step s
INNER JOIN (
  SELECT workflow_id, site_id, MIN(position) AS min_pos
  FROM wf_workflow_step
  GROUP BY workflow_id, site_id
) first_step ON s.workflow_id = first_step.workflow_id
  AND s.site_id = first_step.site_id
  AND s.position = first_step.min_pos
SET s.allow_add_package = 1;

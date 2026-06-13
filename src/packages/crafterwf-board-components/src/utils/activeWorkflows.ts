import type { Dispatch } from 'redux';

import { fetchSandboxItem } from '@craftercms/studio-ui/services/content';

import { getWorkflow, WorkflowSummary } from '../api/adminApi';
import { attachContent, createPackage, ContentPackageWithComments } from '../api/workflowApi';
import { isValidContentPath, resolveAttachmentLabel } from './attachmentUtils';
import { openWorkflowBoard } from './openWorkflowBoard';

export const WORKFLOWS_UPDATED_EVENT = 'crafterwf:workflows-updated';

export interface WorkflowPackageGroup {
  workflowId: string;
  workflowName: string;
  packages: ContentPackageWithComments[];
}

export function notifyWorkflowsUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(WORKFLOWS_UPDATED_EVENT));
  }
}

export function groupPackagesByWorkflow(packages: ContentPackageWithComments[]): WorkflowPackageGroup[] {
  const groups = new Map<string, WorkflowPackageGroup>();
  packages.forEach((pkg) => {
    const workflowId = pkg.workflowId || 'unknown';
    const workflowName = pkg.workflowName || 'Workflow';
    const existing = groups.get(workflowId);
    if (existing) {
      existing.packages.push(pkg);
    } else {
      groups.set(workflowId, { workflowId, workflowName, packages: [pkg] });
    }
  });
  return Array.from(groups.values()).sort((a, b) => a.workflowName.localeCompare(b.workflowName));
}

function previewServerAddress(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  return `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
}

export function openWorkflowBoardForGroup(dispatch: Dispatch, group: WorkflowPackageGroup) {
  const openPackageId =
    group.packages.length === 1 ? group.packages[0].workflowPackageId : undefined;
  openWorkflowBoard(dispatch, group.workflowName, {
    workflowId: group.workflowId,
    openPackageId
  });
}

export function startWorkflowPackageForContent(
  dispatch: Dispatch,
  siteId: string,
  contentPath: string,
  workflow: WorkflowSummary
): Promise<void> {
  return new Promise((resolve, reject) => {
    getWorkflow(siteId, workflow.id).subscribe({
      next(response) {
        const steps = response.response?.result?.steps ?? [];
        if (!steps.length) {
          reject(new Error('This workflow has no steps.'));
          return;
        }
        const firstStep = [...steps].sort(
          (a, b) => (a.position ?? 0) - (b.position ?? 0)
        )[0];
        if (!firstStep?.id) {
          reject(new Error('Could not resolve the first workflow step.'));
          return;
        }

        resolveContentLabel(siteId, contentPath).then((title) => {
          createPackage(siteId, firstStep.id, title, '', firstStep.color || 'blue').subscribe({
            next(createResponse) {
              const created = createResponse.response?.result;
              const packageId = created?.id as string | undefined;
              if (!packageId) {
                reject(new Error('Failed to create workflow package.'));
                return;
              }
              attachContent(
                siteId,
                packageId,
                contentPath,
                title,
                previewServerAddress()
              ).subscribe({
                next() {
                  openWorkflowBoard(dispatch, workflow.name, {
                    workflowId: workflow.id,
                    openPackageId: packageId
                  });
                  notifyWorkflowsUpdated();
                  resolve();
                },
                error(err) {
                  console.error(err);
                  openWorkflowBoard(dispatch, workflow.name, {
                    workflowId: workflow.id,
                    openPackageId: packageId
                  });
                  notifyWorkflowsUpdated();
                  reject(err);
                }
              });
            },
            error(err) {
              console.error(err);
              reject(err);
            }
          });
        });
      },
      error(err) {
        console.error(err);
        reject(err);
      }
    });
  });
}

export async function resolveContentLabel(siteId: string, contentPath: string): Promise<string> {
  if (!isValidContentPath(contentPath)) {
    return resolveAttachmentLabel(contentPath);
  }
  return new Promise((resolve) => {
    fetchSandboxItem(siteId, contentPath, { castAsDetailedItem: true }).subscribe({
      next(item) {
        resolve(resolveAttachmentLabel(item as unknown as Record<string, unknown>));
      },
      error() {
        resolve(resolveAttachmentLabel(contentPath));
      }
    });
  });
}

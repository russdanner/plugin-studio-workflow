import type { Dispatch } from 'redux';

import { COMMENT_TARGET, getWorkflowPackage } from '../api/workflowApi';
import { getTask, openWorkflowPackage, TASK_TARGET } from '../api/taskApi';
import { buildOpenIcePanelAction } from './studioPreview';

const TASKS_PANEL_WIDGET_ID = 'org.rd.plugin.crafterwf.tasksPanel';

export const NOTIFICATION_TARGET = {
  CONTENT: COMMENT_TARGET.CONTENT,
  WORKFLOW_PACKAGE: COMMENT_TARGET.WORKFLOW_PACKAGE,
  TASK: 'task'
} as const;

export interface NotificationTargetRef {
  targetType?: string;
  targetId?: string;
  targetTitle?: string;
  targetWorkflowId?: string;
  targetPackageId?: string;
}

export function notificationTargetTypeLabel(targetType?: string): string | null {
  switch (targetType) {
    case NOTIFICATION_TARGET.CONTENT:
      return 'Content';
    case NOTIFICATION_TARGET.WORKFLOW_PACKAGE:
      return 'Workflow Package';
    case NOTIFICATION_TARGET.TASK:
      return 'Task';
    default:
      return targetType || null;
  }
}

export function notificationTargetLinkLabel(notification: NotificationTargetRef): string {
  if (notification.targetTitle) {
    return notification.targetTitle;
  }
  if (notification.targetId) {
    return notification.targetId;
  }
  return 'Open';
}

export function canOpenNotificationTarget(notification: NotificationTargetRef): boolean {
  return Boolean(notification.targetType && notification.targetId);
}

export function openNotificationTarget(
  dispatch: Dispatch,
  siteId: string,
  notification: NotificationTargetRef,
  previewPath: (path: string, label?: string) => void
) {
  const { targetType, targetId, targetWorkflowId, targetPackageId } = notification;
  if (!targetType || !targetId || !siteId) {
    return;
  }

  switch (targetType) {
    case NOTIFICATION_TARGET.CONTENT:
      previewPath(targetId, notification.targetTitle || targetId);
      break;

    case NOTIFICATION_TARGET.WORKFLOW_PACKAGE:
      if (targetWorkflowId) {
        openWorkflowPackage(dispatch, targetWorkflowId, targetId);
      } else {
        getWorkflowPackage(siteId, targetId).subscribe({
          next(response) {
            const workflowId = response.response?.result?.workflowPackage?.workflowId;
            if (workflowId) {
              openWorkflowPackage(dispatch, workflowId, targetId);
            }
          },
          error(e) {
            console.error(e);
          }
        });
      }
      break;

    case NOTIFICATION_TARGET.TASK:
      if (targetWorkflowId && targetPackageId) {
        openWorkflowPackage(dispatch, targetWorkflowId, targetPackageId);
        break;
      }
      getTask(siteId, targetId).subscribe({
        next(response) {
          const task = response.response?.result;
          if (
            task?.targetType === TASK_TARGET.WORKFLOW_PACKAGE &&
            task.targetId &&
            task.targetWorkflowId
          ) {
            openWorkflowPackage(dispatch, task.targetWorkflowId, task.targetId);
          } else {
            dispatch(buildOpenIcePanelAction('Tasks', TASKS_PANEL_WIDGET_ID, siteId) as never);
          }
        },
        error(e) {
          console.error(e);
          dispatch(buildOpenIcePanelAction('Tasks', TASKS_PANEL_WIDGET_ID, siteId) as never);
        }
      });
      break;

    default:
      break;
  }
}

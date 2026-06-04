import type { Dispatch } from 'redux';

import { createCrafterwfWidgetDescriptor } from './pluginWidgets';

export const WORKFLOW_BOARD_WIDGET_ID = 'org.rd.plugin.crafterwf.board';

export interface OpenWorkflowBoardOptions {
  workflowId: string;
  openPackageId?: string;
}

/** Resolve at runtime — avoids bundling studio-ui dialog actions into the plugin. */
function showWidgetDialogAction() {
  const craftercms = (window as any).craftercms;
  return craftercms.libs.ReduxToolkit.createAction('SHOW_WIDGET_DIALOG');
}

export function openWorkflowBoard(
  dispatch: Dispatch,
  workflowTitle: string,
  options: OpenWorkflowBoardOptions,
  siteId?: string
) {
  dispatch(
    showWidgetDialogAction()({
      title: workflowTitle,
      extraProps: {
        workflowId: options.workflowId,
        ...(options.openPackageId ? { openPackageId: options.openPackageId } : {})
      },
      widget: createCrafterwfWidgetDescriptor(WORKFLOW_BOARD_WIDGET_ID, siteId)
    }) as never
  );
}

import { useSelector } from 'react-redux';

import { createCrafterwfWidgetDescriptor } from './pluginWidgets';

/** Avoid bundling studio-ui useSelection (uses import.meta.env, breaks plugin load). */
export function usePreviewContentPath(): string | undefined {
  return useSelector((state: { preview?: { guest?: { path?: string } } }) => state.preview?.guest?.path);
}

export function buildOpenIcePanelAction(title: string, panelWidgetId: string, siteId?: string) {
  const craftercms = (window as { craftercms?: { libs?: { ReduxToolkit?: { createAction?: Function } }; utils?: { state?: { createToolsPanelPage?: Function } } } }).craftercms;
  if (!craftercms?.libs?.ReduxToolkit?.createAction || !craftercms?.utils?.state?.createToolsPanelPage) {
    throw new Error('CrafterCMS Studio API not available. Ensure the plugin is loaded within Studio.');
  }

  const { createAction } = craftercms.libs.ReduxToolkit;
  const { createToolsPanelPage } = craftercms.utils.state;
  const batchActions = createAction('BATCH_ACTIONS');
  const setPreviewEditMode = createAction('EDIT_MODE_CHANGED');
  const pushIcePanelPage = createAction('PUSH_ICE_PANEL_PAGE');

  return batchActions([
    setPreviewEditMode({ editMode: true }),
    pushIcePanelPage(
      createToolsPanelPage(title, [createCrafterwfWidgetDescriptor(panelWidgetId, siteId)], 'icePanel')
    )
  ]);
}

/** @deprecated Use buildOpenIcePanelAction */
export function buildOpenCommentsIcePanelAction(title: string, panelWidgetId: string, siteId?: string) {
  return buildOpenIcePanelAction(title, panelWidgetId, siteId);
}

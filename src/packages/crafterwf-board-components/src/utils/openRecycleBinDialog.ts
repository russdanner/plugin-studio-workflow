import type { Dispatch } from 'redux';

import { createCrafterwfWidgetDescriptor } from './pluginWidgets';

export const RECYCLE_BIN_DIALOG_WIDGET_ID = 'org.rd.plugin.crafterwf.recycleBinDialog';

function showWidgetDialogAction() {
  const craftercms = (window as { craftercms?: { libs?: { ReduxToolkit?: { createAction?: Function } } } })
    .craftercms;
  return craftercms?.libs?.ReduxToolkit?.createAction('SHOW_WIDGET_DIALOG');
}

export function openRecycleBinDialog(dispatch: Dispatch, title = 'Recycle bin', siteId?: string) {
  const showWidgetDialog = showWidgetDialogAction();
  if (!showWidgetDialog) {
    return;
  }
  dispatch(
    showWidgetDialog({
      title,
      fullHeight: false,
      maxWidth: false,
      PaperProps: {
        sx: {
          width: '70vw',
          maxWidth: '70vw',
          height: '70vh',
          maxHeight: '70vh',
          m: 2,
          borderRadius: 2,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }
      },
      widget: createCrafterwfWidgetDescriptor(RECYCLE_BIN_DIALOG_WIDGET_ID, siteId)
    }) as never
  );
}

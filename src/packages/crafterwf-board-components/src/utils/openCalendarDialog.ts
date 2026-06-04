import type { Dispatch } from 'redux';

import { createCrafterwfWidgetDescriptor } from './pluginWidgets';

export const CALENDAR_DIALOG_WIDGET_ID = 'org.rd.plugin.crafterwf.calendarDialog';

/** Resolve at runtime — avoids bundling studio-ui dialog actions into the plugin. */
function showWidgetDialogAction() {
  const craftercms = (window as any).craftercms;
  return craftercms.libs.ReduxToolkit.createAction('SHOW_WIDGET_DIALOG');
}

export function openCalendarDialog(dispatch: Dispatch, title = 'Calendar', siteId?: string) {
  dispatch(
    showWidgetDialogAction()({
      title,
      fullHeight: false,
      maxWidth: 'lg',
      PaperProps: {
        sx: {
          m: { xs: 1.5, sm: 2.5 },
          maxHeight: 'calc(100vh - 32px)',
          borderRadius: 2
        }
      },
      widget: createCrafterwfWidgetDescriptor(CALENDAR_DIALOG_WIDGET_ID, siteId)
    }) as never
  );
}

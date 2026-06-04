const SHOW_SYSTEM_NOTIFICATION = 'SHOW_SYSTEM_NOTIFICATION';

/**
 * Show Studio's bottom-left snackbar (notistack via GlobalDialogManager).
 * Widget plugins publish through the host bus when available; otherwise Redux dispatch.
 * Do not use both — Studio listens to both and would show duplicate snackbars.
 */
export function showStudioErrorSnack(message: string) {
  const text = message?.trim();
  if (!text) {
    return;
  }

  const craftercms = (window as typeof window & { craftercms?: any }).craftercms;
  const action = {
    type: SHOW_SYSTEM_NOTIFICATION,
    payload: {
      message: text,
      options: {
        variant: 'error' as const,
        autoHideDuration: 8000
      }
    }
  };

  const bus = craftercms?.utils?.subjects?.getHostToHostBus?.();
  if (bus) {
    bus.next(action);
    return;
  }

  const store = typeof craftercms?.getStore === 'function' ? craftercms.getStore() : null;
  if (store?.dispatch) {
    store.dispatch(action);
    return;
  }

  window.alert(text);
}

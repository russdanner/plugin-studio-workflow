import type { Dispatch } from 'redux';

/** Tell Studio's path navigator a sandbox item moved (refreshes the sidebar tree). */
export function emitStudioMoveContentEvent(
  dispatch: Dispatch,
  siteId: string,
  sourcePath: string,
  targetPath: string
) {
  const craftercms = (window as { craftercms?: { libs?: { ReduxToolkit?: { createAction?: Function } } } })
    .craftercms;
  const createAction = craftercms?.libs?.ReduxToolkit?.createAction;
  if (!createAction) {
    return;
  }
  const moveContentEvent = createAction('MOVE_CONTENT_EVENT');
  dispatch(
    moveContentEvent({
      siteId,
      sourcePath,
      targetPath,
      timestamp: Date.now(),
      eventType: 'MOVE_CONTENT_EVENT',
      user: null
    }) as never
  );
}

/** Tell Studio's path navigator content was deleted (refreshes the sidebar tree). */
export function emitStudioDeleteContentEvent(dispatch: Dispatch, siteId: string, targetPath: string) {
  const craftercms = (window as { craftercms?: { libs?: { ReduxToolkit?: { createAction?: Function } } } })
    .craftercms;
  const createAction = craftercms?.libs?.ReduxToolkit?.createAction;
  if (!createAction) {
    return;
  }
  const deleteContentEvent = createAction('DELETE_CONTENT_EVENT');
  dispatch(
    deleteContentEvent({
      siteId,
      targetPath,
      timestamp: Date.now(),
      eventType: 'DELETE_CONTENT_EVENT',
      user: null
    }) as never
  );
}

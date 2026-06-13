import type { Dispatch } from 'redux';
/** Tell Studio's path navigator a sandbox item moved (refreshes the sidebar tree). */
export declare function emitStudioMoveContentEvent(dispatch: Dispatch, siteId: string, sourcePath: string, targetPath: string): void;
/** Tell Studio's path navigator content was deleted (refreshes the sidebar tree). */
export declare function emitStudioDeleteContentEvent(dispatch: Dispatch, siteId: string, targetPath: string): void;

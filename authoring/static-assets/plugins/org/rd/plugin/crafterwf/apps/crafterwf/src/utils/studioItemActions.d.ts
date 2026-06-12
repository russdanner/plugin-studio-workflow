import type { Dispatch } from 'redux';
import type { AttachedSandboxItem } from '../types/CardDetailsRecord';
export declare function openStudioItemHistory(dispatch: Dispatch, item: AttachedSandboxItem): void;
export declare function openStudioItemDependencies(dispatch: Dispatch, item: AttachedSandboxItem): void;
export declare function resolveSandboxItemInternalName(item: AttachedSandboxItem): string;

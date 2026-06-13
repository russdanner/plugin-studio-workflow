import { resolveActiveSiteId } from './pluginWidgets';

export type StudioStore = {
  getState(): Record<string, unknown>;
  dispatch(action: unknown): unknown;
  subscribe(listener: () => void): () => void;
};

function readCraftercms(): {
  getStore?: () => StudioStore;
  store?: StudioStore;
} | undefined {
  return (window as unknown as { craftercms?: { getStore?: () => StudioStore; store?: StudioStore } }).craftercms;
}

/** Studio shell Redux store (works outside React Provider context). */
export function getStudioStore(): StudioStore | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const craftercms = readCraftercms();
  if (typeof craftercms?.getStore === 'function') {
    return craftercms.getStore();
  }
  return craftercms?.store ?? null;
}

export function getActiveSiteFromStore(explicit?: string): string {
  const fromExplicit = resolveActiveSiteId(explicit);
  if (fromExplicit) {
    return fromExplicit;
  }
  const state = getStudioStore()?.getState?.() as { activeSite?: string } | undefined;
  return state?.activeSite?.trim() ?? '';
}

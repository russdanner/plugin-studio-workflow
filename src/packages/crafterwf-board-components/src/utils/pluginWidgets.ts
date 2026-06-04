export const CRAFTERWF_PLUGIN_ID = 'org.rd.plugin.crafterwf';
export const CRAFTERWF_APP_NAME = 'crafterwf';
export const CRAFTERWF_APP_FILE = 'index.js';

export function resolveActiveSiteId(explicit?: string): string {
  if (explicit?.trim()) {
    return explicit.trim();
  }
  if (typeof window === 'undefined') {
    return '';
  }
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('site') || params.get('crafterSite');
  if (fromQuery) {
    return fromQuery;
  }
  const hashMatch = window.location.hash.match(/[?&]site=([^&]+)/);
  if (hashMatch?.[1]) {
    return decodeURIComponent(hashMatch[1]);
  }
  const state = (window as { craftercms?: { store?: { getState?: () => { activeSite?: string } } } }).craftercms
    ?.store?.getState?.();
  return state?.activeSite ?? '';
}

export function createCrafterwfPluginBinding(siteId: string) {
  const craftercms = (window as { craftercms?: { utils?: { state?: { createFileBuilder?: Function } } } }).craftercms;
  const createFileBuilder = craftercms?.utils?.state?.createFileBuilder;
  if (!createFileBuilder || !siteId) {
    return undefined;
  }
  return createFileBuilder(siteId, 'apps', CRAFTERWF_APP_NAME, CRAFTERWF_APP_FILE, CRAFTERWF_PLUGIN_ID);
}

export function createCrafterwfWidgetDescriptor(widgetId: string, siteId?: string) {
  const craftercms = (window as { craftercms?: { utils?: { state?: { createWidgetDescriptor?: Function } } } })
    .craftercms;
  const createWidgetDescriptor = craftercms?.utils?.state?.createWidgetDescriptor;
  if (!createWidgetDescriptor) {
    return { id: widgetId };
  }
  const resolvedSiteId = resolveActiveSiteId(siteId);
  const plugin = resolvedSiteId ? createCrafterwfPluginBinding(resolvedSiteId) : undefined;
  return createWidgetDescriptor(plugin ? { id: widgetId, plugin } : { id: widgetId });
}

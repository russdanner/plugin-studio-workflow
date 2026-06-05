import { get } from '@craftercms/studio-ui/utils/ajax';

/** Read-only plugin REST endpoints (GET). */
export function pluginGet(url: string) {
  return get(url);
}

/**
 * State-changing plugin REST endpoints. Crafter Studio plugin scripts use
 * *.get.groovy for query-parameter mutations (POST/DELETE routing is unreliable).
 */
export function pluginPost(url: string) {
  return get(url);
}

/** Destructive plugin REST endpoints (query params on URL, served by *.get.groovy). */
export function pluginDelete(url: string) {
  return get(url);
}

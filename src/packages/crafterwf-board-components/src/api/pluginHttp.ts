import { get, post, del } from '@craftercms/studio-ui/utils/ajax';

/** Read-only plugin REST endpoints (GET). */
export function pluginGet(url: string) {
  return get(url);
}

/** State-changing plugin REST endpoints (POST). Query parameters stay on the URL. */
export function pluginPost(url: string) {
  return post(url, {});
}

/** Destructive plugin REST endpoints (DELETE). Query parameters stay on the URL. */
export function pluginDelete(url: string) {
  return del(url);
}

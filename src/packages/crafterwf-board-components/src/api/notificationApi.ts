import { pluginGet, pluginPost } from './pluginHttp';
import { PLUGIN_SERVICE_BASE } from './workflowApi';

export interface WorkflowNotification {
  id: string;
  siteId: string;
  userId: number;
  title: string;
  message?: string;
  targetType?: string;
  targetId?: string;
  targetTitle?: string;
  targetWorkflowId?: string;
  targetPackageId?: string;
  read: boolean;
  resolved: boolean;
  archived: boolean;
  createdOn?: string;
  modifiedOn?: string;
}

export const NOTIFICATIONS_UPDATED_EVENT = 'crafterwf:notifications-updated';

export function notifyNotificationsUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(NOTIFICATIONS_UPDATED_EVENT));
  }
}

export function listNotifications(
  siteId: string,
  unreadOnly = false,
  includeResolved = true,
  includeArchived = false,
  markDisplayedAsRead = true
) {
  const url =
    `${PLUGIN_SERVICE_BASE}/notification/list.json?siteId=${encodeURIComponent(siteId)}` +
    `&unreadOnly=${unreadOnly ? 'true' : 'false'}` +
    `&includeResolved=${includeResolved ? 'true' : 'false'}` +
    `&includeArchived=${includeArchived ? 'true' : 'false'}` +
    `&markDisplayedAsRead=${markDisplayedAsRead ? 'true' : 'false'}`;
  return pluginGet(url);
}

export function getUnreadNotificationCount(siteId: string) {
  const url =
    `${PLUGIN_SERVICE_BASE}/notification/unread-count.json?siteId=${encodeURIComponent(siteId)}`;
  return pluginGet(url);
}

export function createNotification(
  siteId: string,
  title: string,
  message: string,
  targetType?: string,
  targetId?: string,
  userId?: number
) {
  let url =
    `${PLUGIN_SERVICE_BASE}/notification/create.json?siteId=${encodeURIComponent(siteId)}` +
    `&title=${encodeURIComponent(title)}` +
    `&message=${encodeURIComponent(message)}`;
  if (targetType) {
    url += `&targetType=${encodeURIComponent(targetType)}`;
  }
  if (targetId) {
    url += `&targetId=${encodeURIComponent(targetId)}`;
  }
  if (userId != null) {
    url += `&userId=${userId}`;
  }
  return pluginPost(url);
}

export function markNotificationRead(siteId: string, notificationId: string, read = true) {
  const url =
    `${PLUGIN_SERVICE_BASE}/notification/mark-read.json?siteId=${encodeURIComponent(siteId)}` +
    `&notificationId=${encodeURIComponent(notificationId)}` +
    `&read=${read ? 'true' : 'false'}`;
  return pluginPost(url);
}

export function markAllNotificationsRead(siteId: string) {
  const url =
    `${PLUGIN_SERVICE_BASE}/notification/mark-read.json?siteId=${encodeURIComponent(siteId)}` +
    '&markAll=true';
  return pluginPost(url);
}

export function resolveNotification(siteId: string, notificationId: string, resolved: boolean) {
  const url =
    `${PLUGIN_SERVICE_BASE}/notification/resolve.json?siteId=${encodeURIComponent(siteId)}` +
    `&notificationId=${encodeURIComponent(notificationId)}` +
    `&resolved=${resolved ? 'true' : 'false'}`;
  return pluginPost(url);
}

export function archiveNotification(siteId: string, notificationId: string, archived: boolean) {
  const url =
    `${PLUGIN_SERVICE_BASE}/notification/archive.json?siteId=${encodeURIComponent(siteId)}` +
    `&notificationId=${encodeURIComponent(notificationId)}` +
    `&archived=${archived ? 'true' : 'false'}`;
  return pluginPost(url);
}

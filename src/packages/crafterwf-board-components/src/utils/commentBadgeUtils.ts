import { WorkflowComment } from '../api/workflowApi';

export const COMMENTS_UPDATED_EVENT = 'crafterwf:comments-updated';

export function notifyCommentsUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(COMMENTS_UPDATED_EVENT));
  }
}

function commentsViewedStorageKey(siteId: string, contentPath: string): string {
  return `crafterwf:comments-viewed:${siteId}:${contentPath}`;
}

export function markCommentsViewed(siteId: string, contentPath: string) {
  if (typeof window === 'undefined') {
    return;
  }
  sessionStorage.setItem(commentsViewedStorageKey(siteId, contentPath), new Date().toISOString());
}

function getCommentsLastViewed(siteId: string, contentPath: string): string | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }
  return sessionStorage.getItem(commentsViewedStorageKey(siteId, contentPath)) ?? undefined;
}

export function commentMentionsUsername(body: string, username: string): boolean {
  if (!body?.trim() || !username?.trim()) {
    return false;
  }
  const escaped = username.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(?<![\\w.@])@${escaped}(?![\\w.\\-@])`, 'i');
  return pattern.test(body);
}

export function isUnreadComment(
  comment: WorkflowComment,
  currentUserId: number | undefined,
  lastViewedAt?: string
): boolean {
  if (comment.archived || comment.resolved) {
    return false;
  }
  if (currentUserId != null && comment.authorId === currentUserId) {
    return false;
  }
  if (lastViewedAt && comment.createdOn) {
    const viewed = Date.parse(lastViewedAt);
    const created = Date.parse(comment.createdOn);
    if (!Number.isNaN(viewed) && !Number.isNaN(created) && created <= viewed) {
      return false;
    }
  }
  return true;
}

export function countCommentBadgeState(
  comments: WorkflowComment[],
  currentUserId: number | undefined,
  currentUsername: string | undefined,
  siteId: string,
  contentPath: string
): { unreadCount: number; mentionCount: number } {
  const lastViewedAt = getCommentsLastViewed(siteId, contentPath);
  let unreadCount = 0;
  let mentionCount = 0;

  comments.forEach((comment) => {
    if (!isUnreadComment(comment, currentUserId, lastViewedAt)) {
      return;
    }
    unreadCount += 1;
    if (currentUsername && commentMentionsUsername(comment.body, currentUsername)) {
      mentionCount += 1;
    }
  });

  return { unreadCount, mentionCount };
}

export function collectCommentsForContentPath(
  contentComments: WorkflowComment[],
  packages: { comments: WorkflowComment[] }[]
): WorkflowComment[] {
  const all = [...contentComments];
  packages.forEach((pkg) => {
    all.push(...(pkg.comments ?? []));
  });
  return all;
}

export interface MentionUserRef {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
}

export type CommentBodySegment =
  | { type: 'text'; value: string }
  | { type: 'mention'; username: string; user?: MentionUserRef };

export function extractMentionedUserIds(body: string, users: MentionUserRef[]): number[] {
  if (!body?.trim() || !users.length) {
    return [];
  }
  const ids = new Set<number>();
  users.forEach((user) => {
    const escaped = user.username.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(?<![\\w.@])@${escaped}(?![\\w.\\-])`, 'i');
    if (pattern.test(body)) {
      ids.add(user.id);
    }
  });
  return Array.from(ids);
}

export function parseCommentBodyMentions(body: string, users: MentionUserRef[]): CommentBodySegment[] {
  if (!body) {
    return [];
  }
  if (!users.length) {
    return [{ type: 'text', value: body }];
  }

  const byUsername = new Map(users.map((user) => [user.username.toLowerCase(), user]));
  const escaped = users
    .map((user) => user.username.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length);

  const pattern = new RegExp(`(?<![\\w.@])@(${escaped.join('|')})(?![\\w.\\-])`, 'gi');
  const segments: CommentBodySegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(body)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', value: body.slice(lastIndex, match.index) });
    }
    const username = match[1];
    segments.push({
      type: 'mention',
      username,
      user: byUsername.get(username.toLowerCase())
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < body.length) {
    segments.push({ type: 'text', value: body.slice(lastIndex) });
  }

  return segments.length ? segments : [{ type: 'text', value: body }];
}

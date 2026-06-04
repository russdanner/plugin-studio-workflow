export interface MentionUserRef {
  id: number;
  username: string;
}

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

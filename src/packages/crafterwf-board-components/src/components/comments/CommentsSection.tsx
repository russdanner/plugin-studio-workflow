import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  Box,
  Button,
  Chip,
  IconButton,
  List,
  ListItemButton,
  Paper,
  Popper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { fetchAll as fetchAllUsers } from '@craftercms/studio-ui/services/users';

import { WorkflowComment } from '../../api/workflowApi';
import { extractMentionedUserIds, MentionUserRef } from '../../utils/mentionUtils';
import { UserAvatarFromUsername, UserAvatarLabel, userDisplayName } from '../users/studioUserDisplay';
import CommentBodyWithMentions from './CommentBodyWithMentions';

export interface MentionUserOption extends MentionUserRef {
  label: string;
}

function formatCommentDate(value?: string | null): string {
  if (!value) {
    return '';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}

function getMentionQuery(text: string, cursor: number): string | null {
  const before = text.slice(0, cursor);
  const match = /(?:^|[\s([{])@([\w.\-]*)$/.exec(before);
  if (!match) {
    return null;
  }
  return match[1];
}

export interface CommentsSectionProps {
  comments: WorkflowComment[];
  onAddComment?: (body: string, mentionedUserIds?: number[]) => void;
  onResolveComment?: (commentId: string, resolved: boolean) => void;
  onArchiveComment?: (commentId: string, archived: boolean) => void;
  showArchived?: boolean;
  onShowArchivedChange?: (show: boolean) => void;
  compact?: boolean;
  mentionUsers?: MentionUserOption[];
}

const CommentsSection = ({
  comments,
  onAddComment,
  onResolveComment,
  onArchiveComment,
  showArchived = false,
  onShowArchivedChange,
  compact = false,
  mentionUsers: mentionUsersProp
}: CommentsSectionProps) => {
  const siteId = useActiveSiteId();
  const [commentDraft, setCommentDraft] = useState('');
  const [mentionUsers, setMentionUsers] = useState<MentionUserOption[]>(mentionUsersProp ?? []);
  const [mentionOpen, setMentionOpen] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const mentionAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mentionUsersProp) {
      setMentionUsers(mentionUsersProp);
      return;
    }
    if (!onAddComment) {
      return;
    }
    fetchAllUsers({ limit: 500, offset: 0 }).subscribe({
      next(users) {
        const options = (users ?? [])
          .filter((user) => user.enabled !== false)
          .map((user) => ({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            label: userDisplayName(user)
          }));
        setMentionUsers(options);
      },
      error(e) {
        console.error(e);
      }
    });
  }, [mentionUsersProp, onAddComment]);

  const filteredMentionUsers = useMemo(() => {
    const q = mentionQuery.toLowerCase();
    return mentionUsers
      .filter(
        (user) =>
          !q ||
          user.username.toLowerCase().includes(q) ||
          user.label.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [mentionQuery, mentionUsers]);

  const syncMentionState = useCallback((text: string, cursor: number) => {
    setCursorPosition(cursor);
    const query = getMentionQuery(text, cursor);
    if (query != null && mentionUsers.length > 0) {
      setMentionQuery(query);
      setMentionOpen(true);
    } else {
      setMentionOpen(false);
      setMentionQuery('');
    }
  }, [mentionUsers.length]);

  const insertMention = (username: string) => {
    const text = commentDraft;
    const cursor = cursorPosition;
    const before = text.slice(0, cursor);
    const after = text.slice(cursor);
    const atIndex = before.lastIndexOf('@');
    if (atIndex < 0) {
      return;
    }
    const fragment = before.slice(atIndex);
    if (!/^@[\w.\-]*$/.test(fragment)) {
      return;
    }
    const prefix = before.slice(0, atIndex);
    const insertion = `@${username} `;
    const next = `${prefix}${insertion}${after}`;
    setCommentDraft(next);
    setMentionOpen(false);
    setMentionQuery('');
    const nextCursor = prefix.length + insertion.length;
    window.requestAnimationFrame(() => {
      const el = inputRef.current;
      if (el) {
        el.focus();
        el.setSelectionRange(nextCursor, nextCursor);
      }
    });
  };

  const handleSubmitComment = () => {
    const body = commentDraft.trim();
    if (!body || !onAddComment) {
      return;
    }
    onAddComment(body, extractMentionedUserIds(body, mentionUsers));
    setCommentDraft('');
    setMentionOpen(false);
  };

  const visibleComments = comments;
  const showArchivedToggle = Boolean(onShowArchivedChange);

  return (
    <Stack spacing={compact ? 0.75 : 1}>
      {visibleComments.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 0.5 }}>
          {showArchived && showArchivedToggle ? 'No comments (including archived).' : 'No comments yet.'}
        </Typography>
      ) : (
        <Stack spacing={0.75}>
          {visibleComments.map((comment) => (
            <Box
              key={comment.id}
              sx={{
                p: 1,
                borderRadius: 1,
                bgcolor: comment.archived
                  ? 'action.disabledBackground'
                  : comment.resolved
                    ? 'action.selected'
                    : 'action.hover',
                opacity: comment.archived || comment.resolved ? 0.85 : 1,
                minWidth: 0
              }}
            >
              <Stack direction="row" spacing={0.75} alignItems="center" flexWrap="wrap" sx={{ mb: 0.5 }}>
                <UserAvatarFromUsername
                  username={comment.authorUsername || (comment.authorId ? `user-${comment.authorId}` : 'unknown')}
                  label={comment.authorUsername || (comment.authorId ? `User #${comment.authorId}` : 'Unknown')}
                  size={22}
                />
                {comment.resolved && (
                  <Chip label="Resolved" size="small" color="success" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                )}
                {comment.archived && (
                  <Chip label="Archived" size="small" color="default" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                )}
                <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                  {formatCommentDate(comment.createdOn)}
                </Typography>
              </Stack>
              <CommentBodyWithMentions body={comment.body} mentionUsers={mentionUsers} siteId={siteId} />
              {(onResolveComment || onArchiveComment) && !comment.archived && (
                <Stack direction="row" spacing={1} sx={{ mt: 0.75 }}>
                  {onResolveComment && (
                    <Button
                      size="small"
                      sx={{ px: 0, minWidth: 0 }}
                      onClick={() => onResolveComment(comment.id, !comment.resolved)}
                    >
                      {comment.resolved ? 'Reopen' : 'Resolve'}
                    </Button>
                  )}
                  {onArchiveComment && (
                    <Button
                      size="small"
                      sx={{ px: 0, minWidth: 0 }}
                      onClick={() => onArchiveComment(comment.id, true)}
                    >
                      Archive
                    </Button>
                  )}
                </Stack>
              )}
              {onArchiveComment && comment.archived && (
                <Button
                  size="small"
                  sx={{ mt: 0.75, px: 0, minWidth: 0 }}
                  onClick={() => onArchiveComment(comment.id, false)}
                >
                  Restore
                </Button>
              )}
            </Box>
          ))}
        </Stack>
      )}

      {showArchivedToggle && (
        <Button
          size="small"
          sx={{ alignSelf: 'flex-start', px: 0, minWidth: 0 }}
          onClick={() => onShowArchivedChange?.(!showArchived)}
        >
          {showArchived ? 'Hide archived' : 'Show archived'}
        </Button>
      )}

      {onAddComment && (
        <Box ref={mentionAnchorRef} sx={{ position: 'relative', pt: 0.5 }}>
          <TextField
            inputRef={inputRef}
            multiline
            minRows={compact ? 2 : 2}
            maxRows={6}
            size="small"
            placeholder="Add a comment… Use @ to mention someone"
            value={commentDraft}
            onChange={(event) => {
              const next = event.target.value;
              setCommentDraft(next);
              syncMentionState(next, event.target.selectionStart ?? next.length);
            }}
            onClick={() => {
              const target = inputRef.current;
              if (target) {
                syncMentionState(commentDraft, target.selectionStart ?? 0);
              }
            }}
            onKeyUp={() => {
              const target = inputRef.current;
              if (target) {
                syncMentionState(commentDraft, target.selectionStart ?? 0);
              }
            }}
            onKeyDown={(event) => {
              if (mentionOpen && filteredMentionUsers.length > 0) {
                if (event.key === 'Tab') {
                  event.preventDefault();
                  insertMention(filteredMentionUsers[0].username);
                  return;
                }
                if (event.key === 'Enter' && !event.shiftKey && getMentionQuery(commentDraft, cursorPosition) != null) {
                  event.preventDefault();
                  insertMention(filteredMentionUsers[0].username);
                  return;
                }
              }
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSubmitComment();
              }
              if (event.key === 'Escape' && mentionOpen) {
                event.preventDefault();
                setMentionOpen(false);
              }
            }}
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                alignItems: 'flex-end',
                pr: 0.5,
                pb: 0.5
              },
              '& .MuiInputBase-inputMultiline': {
                pr: 4
              }
            }}
          />
          <Popper
            open={mentionOpen && filteredMentionUsers.length > 0}
            anchorEl={mentionAnchorRef.current}
            placement="top-start"
            sx={{ zIndex: (theme) => theme.zIndex.modal + 2 }}
          >
            <Paper elevation={4} sx={{ maxHeight: 200, overflow: 'auto', minWidth: 220 }}>
              <List dense disablePadding>
                {filteredMentionUsers.map((user) => (
                  <ListItemButton
                    key={user.id}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      insertMention(user.username);
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ width: '100%', minWidth: 0 }}>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <UserAvatarLabel user={user} label={user.label} size={22} typographyVariant="body2" />
                      </Box>
                      <Typography variant="caption" color="text.secondary" noWrap>
                        @{user.username}
                      </Typography>
                    </Stack>
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          </Popper>
          <IconButton
            size="small"
            color="primary"
            disabled={!commentDraft.trim()}
            onClick={handleSubmitComment}
            aria-label="Send comment"
            sx={{
              position: 'absolute',
              right: 6,
              bottom: 6
            }}
          >
            <SendRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Stack>
  );
};

export default CommentsSection;

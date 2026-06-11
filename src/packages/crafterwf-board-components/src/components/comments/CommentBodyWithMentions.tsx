import * as React from 'react';
import { useMemo } from 'react';

import { Typography } from '@mui/material';

import { MentionUserRef, parseCommentBodyMentions } from '../../utils/mentionUtils';
import { MentionHighlight } from './MentionHighlight';

export interface CommentBodyWithMentionsProps {
  body: string;
  mentionUsers: MentionUserRef[];
  siteId?: string | null;
}

export function CommentBodyWithMentions({ body, mentionUsers, siteId }: CommentBodyWithMentionsProps) {
  const segments = useMemo(() => parseCommentBodyMentions(body, mentionUsers), [body, mentionUsers]);

  return (
    <Typography variant="body2" component="div" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
      {segments.map((segment, index) =>
        segment.type === 'text' ? (
          <React.Fragment key={index}>{segment.value}</React.Fragment>
        ) : (
          <MentionHighlight
            key={`${segment.username}-${index}`}
            username={segment.username}
            user={segment.user}
            siteId={siteId}
          />
        )
      )}
    </Typography>
  );
}

export default CommentBodyWithMentions;

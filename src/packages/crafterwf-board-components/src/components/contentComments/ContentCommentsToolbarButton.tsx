import * as React from 'react';

import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import { IconButton, Tooltip } from '@mui/material';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { useDispatch } from 'react-redux';

import { buildOpenCommentsIcePanelAction } from '../../utils/studioPreview';

const CONTENT_COMMENTS_PANEL_WIDGET_ID = 'org.rd.plugin.crafterwf.contentCommentsPanel';

export function ContentCommentsToolbarButton(props: Record<string, unknown>) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const title = typeof props.title === 'string' && props.title.trim() ? props.title : 'Comments';

  const openCommentsPanel = () => {
    dispatch(
      buildOpenCommentsIcePanelAction(title, CONTENT_COMMENTS_PANEL_WIDGET_ID, siteId ?? undefined) as never
    );
  };

  return (
    <Tooltip title={title}>
      <span>
        <IconButton aria-label={title} size="large" {...props} onClick={openCommentsPanel}>
          <CommentRoundedIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
}

export default ContentCommentsToolbarButton;

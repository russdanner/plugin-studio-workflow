import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Container, Stack, Typography } from '@mui/material';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { showEditDialog, showPreviewDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { useSelection } from '@craftercms/studio-ui/hooks/useSelection';
import { isImage } from '@craftercms/studio-ui/utils/content';
import { fetchSandboxItem } from '@craftercms/studio-ui/services/content';

function handlePreviewRequest(sandboxItem, { siteId, contentId, authoringBase, setStatusMessage, dispatch }) {
  if (sandboxItem.systemType === 'page') {
    const pageUrl = contentId.replace('/site/website/', '').replace('index.xml', '').replace('.xml', '.html');
    window.location.href = '/studio/preview#/?page=' + pageUrl + '&site=' + siteId;
  } else if (sandboxItem.systemType === 'component' || sandboxItem.systemType === 'levelDescriptor') {
    dispatch(
      showEditDialog({
        site: siteId,
        path: contentId,
        authoringBase: authoringBase,
        readonly: true
      })
    );
  } else if (sandboxItem.systemType === 'asset') {
    if (isImage(sandboxItem)) {
      dispatch(
        showPreviewDialog({
          site: siteId,
          type: 'image',
          url: contentId,
          authoringBase: authoringBase
        })
      );
    } else if (contentId.endsWith('.mp4')) {
      dispatch(
        showPreviewDialog({
          site: siteId,
          type: 'video',
          url: contentId,
          authoringBase: authoringBase
        })
      );
    } else {
      dispatch(
        showPreviewDialog({
          site: siteId,
          type: 'editor',
          url: contentId,
          authoringBase: authoringBase
        })
      );
    }
  } else {
    setStatusMessage("Oops, we don't know how to preview this type of content item.");
  }
}

function CrafterWfAppPage(props) {
  return (
    <Container maxWidth="sm" sx={{ py: 6, px: 2 }}>
      <Stack spacing={2} alignItems="center" textAlign="center">
        <Box
          component="img"
          src="/studio/static-assets/images/content_creation.svg"
          alt=""
          sx={{ width: 'min(240px, 80%)', opacity: 0.95 }}
        />
        <Typography variant="h5" component="h1" fontWeight={600}>
          Crafter Workflow
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {props.message}
        </Typography>
      </Stack>
    </Container>
  );
}

function Preview(props) {
  const {
    location: { search }
  } = props;

  const searchArgs = new URLSearchParams(search);
  const contentId = searchArgs.get('contentId');
  const siteId = searchArgs.get('siteId');
  const dispatch = useDispatch();
  const authoringBase = useSelection((state) => state.env.authoringBase);
  const [statusMessage, setStatusMessage] = useState('We are processing your request :)');

  useEffect(() => {
    if (!siteId || !contentId) {
      setStatusMessage('siteId and contentId are required parameters for preview.');
      return;
    }

    const params = { siteId, contentId, authoringBase, setStatusMessage, dispatch };

    fetchSandboxItem(siteId, contentId, { castAsDetailedItem: true }).subscribe({
      next(sandboxItem) {
        handlePreviewRequest(sandboxItem, params);
      },
      error() {
        setStatusMessage("Oops! We can't find the content you are looking for.");
      }
    });
  }, [siteId, contentId, authoringBase, dispatch]);

  return <CrafterWfAppPage message={statusMessage} />;
}

function Index() {
  return (
    <CrafterWfAppPage message="We don't recognize that URL. Open the board from the Tools panel or use a valid preview link." />
  );
}

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/preview/:arg1?" component={Preview} />
        <Route path="/" exact component={Index} />
      </Switch>
    </HashRouter>
  );
}

export default App;

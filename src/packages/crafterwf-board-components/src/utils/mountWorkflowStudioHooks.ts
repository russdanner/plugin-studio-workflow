import * as React from 'react';
import { CrafterCMSNextBridge } from '@craftercms/studio-ui';

import WorkflowBypassGuard from '../components/workflowBypass/WorkflowBypassGuard';
import WorkflowContentEventBridge from '../components/workflowContentEvents/WorkflowContentEventBridge';
import { getStudioStore } from './studioReduxStore';

declare global {
  interface Window {
    CrafterCMSNext?: {
      render: (
        container: Element | string,
        component: React.ComponentType | string,
        props?: Record<string, unknown>,
        isLegacy?: boolean
      ) => Promise<{ unmount: (options?: { delay?: boolean; removeContainer?: boolean }) => void }>;
    };
    __crafterwfStudioHooksMounted?: boolean;
  }
}

function CrafterwfStudioHooksRoot() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(WorkflowBypassGuard, null),
    React.createElement(WorkflowContentEventBridge, null)
  );
}

/** Mount headless workflow hooks once in the Studio shell (shared Redux store). */
export function mountWorkflowStudioHooks(): void {
  if (typeof window === 'undefined' || window.__crafterwfStudioHooksMounted) {
    return;
  }

  const Root = () =>
    React.createElement(
      CrafterCMSNextBridge,
      { mountGlobalDialogManager: false, mountSnackbarProvider: false },
      React.createElement(CrafterwfStudioHooksRoot)
    );
  Root.displayName = 'CrafterwfStudioHooksRoot';

  const attemptMount = (): boolean => {
    const cms = window.CrafterCMSNext;
    if (!cms?.render || !getStudioStore()) {
      return false;
    }
    window.__crafterwfStudioHooksMounted = true;
    const el = document.createElement('div');
    el.setAttribute('data-crafterwf-studio-hooks', 'true');
    el.style.cssText = 'position:fixed;width:0;height:0;overflow:hidden;pointer-events:none';
    document.body.appendChild(el);
    cms.render(el, Root, {}, true).catch((error) => {
      console.error('[crafterwf] Failed to mount workflow studio hooks', error);
      window.__crafterwfStudioHooksMounted = false;
    });
    return true;
  };

  if (attemptMount()) {
    return;
  }

  const intervalId = window.setInterval(() => {
    if (attemptMount()) {
      window.clearInterval(intervalId);
    }
  }, 250);
  window.setTimeout(() => window.clearInterval(intervalId), 30000);
}

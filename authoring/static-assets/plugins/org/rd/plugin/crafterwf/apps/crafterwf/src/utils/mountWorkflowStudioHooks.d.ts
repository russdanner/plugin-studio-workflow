import * as React from 'react';
declare global {
    interface Window {
        CrafterCMSNext?: {
            render: (container: Element | string, component: React.ComponentType | string, props?: Record<string, unknown>, isLegacy?: boolean) => Promise<{
                unmount: (options?: {
                    delay?: boolean;
                    removeContainer?: boolean;
                }) => void;
            }>;
        };
        __crafterwfStudioHooksMounted?: boolean;
    }
}
/** Mount headless workflow hooks once in the Studio shell (shared Redux store). */
export declare function mountWorkflowStudioHooks(): void;

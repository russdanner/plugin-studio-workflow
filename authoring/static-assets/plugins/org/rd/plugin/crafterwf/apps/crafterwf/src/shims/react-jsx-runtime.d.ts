/**
 * Crafter Studio exposes React via craftercms.libs.React without jsx-runtime internals.
 * Dependencies (e.g. @xyflow/react) import react/jsx-runtime — alias here and use createElement.
 */
import React from 'react';
export declare const Fragment: React.ExoticComponent<{
    children?: React.ReactNode;
}>;
declare type JsxProps = Record<string, unknown> & {
    children?: React.ReactNode;
};
export declare function jsx(type: React.ElementType, props: JsxProps, key?: string | number): React.ReactElement;
export declare const jsxs: typeof jsx;
export {};

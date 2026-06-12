import * as React from 'react';
import { type NodeProps } from '@xyflow/react';
export interface WorkflowStepFlowNodeData extends Record<string, unknown> {
    label: string;
    color: string;
    isTerminal: boolean;
    allowAddPackage: boolean;
    selected: boolean;
}
declare const _default: React.MemoExoticComponent<({ data }: NodeProps<import("@xyflow/react").Node<Record<string, unknown>, string>>) => JSX.Element>;
export default _default;

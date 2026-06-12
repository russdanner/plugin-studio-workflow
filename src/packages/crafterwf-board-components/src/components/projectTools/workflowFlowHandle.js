import React from 'react';
import { Handle, Position } from '@xyflow/react';

export function WorkflowFlowHandle(props) {
  return React.createElement(Handle, {
    isConnectable: true,
    isConnectableStart: props.type === 'source',
    isConnectableEnd: props.type === 'target',
    ...props
  });
}

export { Position };

import { resolveBridgeEventType } from './contentEventUtils';

function assertEqual<T>(actual: T, expected: T, label: string): void {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${String(expected)}, got ${String(actual)}`);
  }
}

assertEqual(resolveBridgeEventType({ eventType: 'CONTENT_EVENT' }), 'edit', 'socket content event');
assertEqual(resolveBridgeEventType({ eventType: 'DUPLICATE' }), 'create', 'duplicate lifecycle');
assertEqual(resolveBridgeEventType({ eventType: 'UPDATE' }), 'edit', 'update lifecycle');
assertEqual(resolveBridgeEventType({}), 'edit', 'missing eventType');

console.log('contentEventUtils tests passed');

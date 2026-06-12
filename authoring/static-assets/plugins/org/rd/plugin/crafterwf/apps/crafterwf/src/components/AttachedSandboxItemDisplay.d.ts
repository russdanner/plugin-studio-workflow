import type { AttachedSandboxItem } from '../types/CardDetailsRecord';
export interface AttachedSandboxItemDisplayProps {
    item: AttachedSandboxItem;
    label: string;
    onClick?: () => void;
}
declare const AttachedSandboxItemDisplay: ({ item, label, onClick }: AttachedSandboxItemDisplayProps) => JSX.Element;
export default AttachedSandboxItemDisplay;

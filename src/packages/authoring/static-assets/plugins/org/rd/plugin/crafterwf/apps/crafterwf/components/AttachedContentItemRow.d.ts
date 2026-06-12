import type { AttachedSandboxItem } from '../types/CardDetailsRecord';
export interface AttachedContentItemRowProps {
    item: AttachedSandboxItem;
    onRemove?: () => void;
    showPath?: boolean;
    /** Show a checkbox for selection (attach clipboard panel). */
    showSelectionCheckbox?: boolean;
    selectionChecked?: boolean;
    onSelectionChange?: (checked: boolean) => void;
}
declare const AttachedContentItemRow: ({ item, onRemove, showPath, showSelectionCheckbox, selectionChecked, onSelectionChange }: AttachedContentItemRowProps) => JSX.Element;
export default AttachedContentItemRow;

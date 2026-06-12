export interface RecycleBinSelectDialogProps {
    open: boolean;
    onClose(): void;
    onConfirm(paths: string[]): void;
    /** Paths already in recycle bin — hidden from feeds. */
    excludedPaths?: string[];
}
declare const RecycleBinSelectDialog: ({ open, onClose, onConfirm, excludedPaths }: RecycleBinSelectDialogProps) => JSX.Element;
export default RecycleBinSelectDialog;

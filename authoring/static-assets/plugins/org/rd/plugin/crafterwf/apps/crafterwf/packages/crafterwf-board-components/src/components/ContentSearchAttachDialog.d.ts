export interface ContentSearchAttachDialogProps {
    open: boolean;
    onClose(): void;
    onAttach(paths: string[]): void;
    /** Paths already on the package — hidden from feeds. */
    attachedPaths?: string[];
}
declare const ContentSearchAttachDialog: ({ open, onClose, onAttach, attachedPaths }: ContentSearchAttachDialogProps) => JSX.Element;
export default ContentSearchAttachDialog;

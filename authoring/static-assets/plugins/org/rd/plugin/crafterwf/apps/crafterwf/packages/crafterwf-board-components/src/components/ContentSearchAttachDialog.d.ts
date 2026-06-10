export interface ContentSearchAttachDialogProps {
    open: boolean;
    onClose(): void;
    onAttach(paths: string[]): void;
}
declare const ContentSearchAttachDialog: ({ open, onClose, onAttach }: ContentSearchAttachDialogProps) => JSX.Element;
export default ContentSearchAttachDialog;

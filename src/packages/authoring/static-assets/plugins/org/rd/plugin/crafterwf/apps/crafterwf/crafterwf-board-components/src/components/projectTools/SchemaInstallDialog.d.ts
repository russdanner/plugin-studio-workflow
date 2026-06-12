import { SchemaStatus } from '../../api/adminApi';
export interface SchemaInstallDialogProps {
    open: boolean;
    siteId: string;
    onClose: () => void;
    onInstalled: (status: SchemaStatus) => void;
}
declare const SchemaInstallDialog: ({ open, siteId, onClose, onInstalled }: SchemaInstallDialogProps) => JSX.Element;
export default SchemaInstallDialog;

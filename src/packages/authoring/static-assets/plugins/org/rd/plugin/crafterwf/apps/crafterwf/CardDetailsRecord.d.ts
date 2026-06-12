import type { DetailedItem, SandboxItem } from '@craftercms/studio-ui/models/Item';
import { WorkflowComment } from '../api/workflowApi';
import { WorkflowTask } from '../api/taskApi';
/** Item metadata from Studio `sandbox_items_by_path` (often cast as detailed). */
export declare type AttachedSandboxItem = SandboxItem | DetailedItem;
export interface CardDetailsRecord {
    attachedDocuments: Array<{
        id: string;
        name: string;
        url: string;
        path?: string;
        sandboxItem?: AttachedSandboxItem;
    }> | null;
    attachedContentItems: AttachedSandboxItem[] | null;
    attachments?: Array<{
        id: string;
        name?: string;
        url?: string;
        _type?: string;
    }> | null;
    comments?: WorkflowComment[] | null;
    tasks?: WorkflowTask[] | null;
}
export default CardDetailsRecord;

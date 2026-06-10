import { StudioPreviewItem } from '../utils/studioItemPreview';
export declare function useStudioItemPreview(): {
    previewItem: (item: StudioPreviewItem) => void;
    previewPath: (path: string, label?: string) => void;
    inspectPath: (path: string, label?: string) => void;
    inspectItem: (item: StudioPreviewItem) => void;
};
export default useStudioItemPreview;

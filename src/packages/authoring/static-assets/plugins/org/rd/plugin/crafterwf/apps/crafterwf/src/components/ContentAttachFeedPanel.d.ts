import { ContentAttachFeedEntry } from '../utils/contentAttachFeeds';
export interface ContentAttachFeedPanelProps {
    title: string;
    description: string;
    entries: ContentAttachFeedEntry[];
    loading: boolean;
    error?: string | null;
    selectedPaths: string[];
    onToggle(path: string, selected: boolean): void;
    onRefresh?(): void;
}
declare const ContentAttachFeedPanel: ({ title, description, entries, loading, error, selectedPaths, onToggle, onRefresh }: ContentAttachFeedPanelProps) => JSX.Element;
export default ContentAttachFeedPanel;

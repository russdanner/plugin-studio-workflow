export interface SelectedContentSourcePanelProps {
    selectedPaths: string[];
    onRemove(path: string): void;
}
declare const SelectedContentSourcePanel: ({ selectedPaths, onRemove }: SelectedContentSourcePanelProps) => JSX.Element;
export default SelectedContentSourcePanel;

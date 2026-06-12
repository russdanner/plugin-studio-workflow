export interface ProjectToolsConfigurationProps {
    onMinimize?: () => void;
    onMaximize?: () => void;
    mountMode?: string;
    embedded?: boolean;
}
/**
 * Project Tools panel for Crafter Workflow (Workflows, Audit Log, Admin tabs).
 * Renders inline when mounted from Site Tools; legacy isolated mounts still work.
 */
export default function ProjectToolsConfiguration(props: ProjectToolsConfigurationProps): JSX.Element;

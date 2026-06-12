import CardRecord from '../types/CardRecord';
import CardDetailsRecord from '../types/CardDetailsRecord';
export interface CardActionsProps {
    card: CardRecord;
    cardDetails: CardDetailsRecord;
    onMenuOpen(): void;
    /** Refresh package details only (attach content, comments) */
    onDetailsChanged?: () => void;
    /** Full package change including board refresh (archive) */
    onPackageChanged?: () => void;
    /** Studio nested dialog opened/closed (search, new content, etc.) */
    onNestedDialogChange?: (open: boolean) => void;
    /** icon = card header menu; button = dialog toolbar */
    variant?: 'icon' | 'button';
}
declare const CardActions: ({ card, cardDetails, onMenuOpen, onDetailsChanged, onPackageChanged, onNestedDialogChange, variant }: CardActionsProps) => JSX.Element;
export default CardActions;

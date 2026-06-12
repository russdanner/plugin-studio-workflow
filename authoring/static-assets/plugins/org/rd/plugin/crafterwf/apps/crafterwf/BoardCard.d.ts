import CardRecord from '../types/CardRecord';
export interface BoardCardProps {
    card: CardRecord;
    detailsOpen?: boolean;
    onDetailsOpen?: () => void;
    onDetailsClose?: () => void;
    onPackageChanged?: () => void;
    /** When true, only render the details dialog (no board card face). */
    dialogOnly?: boolean;
}
declare const BoardCard: ({ card, detailsOpen, onDetailsOpen, onDetailsClose, onPackageChanged, dialogOnly }: BoardCardProps) => JSX.Element;
export default BoardCard;

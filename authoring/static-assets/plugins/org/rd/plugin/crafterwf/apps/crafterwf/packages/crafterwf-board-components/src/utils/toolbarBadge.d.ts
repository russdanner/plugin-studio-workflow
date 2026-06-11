import { BadgeProps } from '@mui/material';
/** Shared toolbar badge styling (compact numeric badge). */
export declare const TOOLBAR_BADGE_SX: {
    readonly '& .MuiBadge-badge': {
        readonly fontSize: "0.65rem";
        readonly fontWeight: 600;
        readonly minWidth: 16;
        readonly height: 16;
        readonly padding: "0 4px";
        readonly boxShadow: "0 0 0 2px var(--mui-palette-background-paper, #fff)";
    };
};
export interface ToolbarIconBadgeProps extends Omit<BadgeProps, 'variant' | 'badgeContent'> {
    /** Activity that warrants a dot (open, unread, packages on page, etc.). */
    count?: number;
    /** When &gt; 0, shows a numeric badge with this value (overdue, @mentions, etc.). */
    overdueCount?: number;
}
/**
 * Toolbar badge: dot when there is activity; numeric count only when overdueCount &gt; 0.
 */
export declare function ToolbarIconBadge({ count, overdueCount, color, max, sx, children, ...rest }: ToolbarIconBadgeProps): JSX.Element;

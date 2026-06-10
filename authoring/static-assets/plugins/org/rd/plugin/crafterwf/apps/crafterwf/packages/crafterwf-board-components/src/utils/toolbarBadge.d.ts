import { BadgeProps } from '@mui/material';
export declare const TOOLBAR_BADGE_SX: {
    readonly '& .MuiBadge-badge': {
        readonly fontSize: "0.65rem";
        readonly fontWeight: 600;
        readonly minWidth: 16;
        readonly height: 16;
        readonly padding: "0 4px";
    };
};
export interface ToolbarIconBadgeProps extends BadgeProps {
    count?: number;
}
export declare function ToolbarIconBadge({ count, color, max, sx, children, ...rest }: ToolbarIconBadgeProps): JSX.Element;

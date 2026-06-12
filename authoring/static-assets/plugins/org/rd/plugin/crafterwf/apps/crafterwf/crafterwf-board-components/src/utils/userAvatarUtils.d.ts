/** Matches @craftercms/studio-ui/utils/string (PersonAvatar / dashboard dashlets). */
export declare function getInitials(value: string): string;
export declare function getInitials(person: {
    firstName: string;
    lastName: string;
}): string;
export declare function toColor(str: string): string;
/** Simple light/dark text pick for avatar backgrounds (matches dashboard intent). */
export declare function contrastTextColor(hexColor: string): string;

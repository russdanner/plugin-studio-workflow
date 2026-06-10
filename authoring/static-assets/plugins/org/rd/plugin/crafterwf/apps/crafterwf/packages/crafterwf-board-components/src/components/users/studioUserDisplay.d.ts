export interface TaskAssigneeOption {
    id: number;
    username: string;
    firstName?: string;
    lastName?: string;
    label: string;
}
export interface StudioUserLike {
    id?: number;
    username: string;
    firstName?: string;
    lastName?: string;
}
export declare function userLabel(user: StudioUserLike): string;
export declare function findAssigneeOption(options: TaskAssigneeOption[], id: number, username?: string): TaskAssigneeOption | undefined;
export declare function resolveAssigneeLabel(assigneeId: number, assigneeUsername: string | undefined, options: TaskAssigneeOption[]): string;
export declare function UserAvatarLabel({ user, label, size, typographyVariant, fontWeight }: {
    user: StudioUserLike;
    label?: string;
    size?: number;
    typographyVariant?: 'body2' | 'caption' | 'subtitle2';
    fontWeight?: number | string;
}): JSX.Element;
export declare function AssigneeMenuItem({ option }: {
    option: TaskAssigneeOption;
}): JSX.Element;
export declare function UserAvatarFromUsername({ username, label, size }: {
    username: string;
    label?: string;
    size?: number;
}): JSX.Element;

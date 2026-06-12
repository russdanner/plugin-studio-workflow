export interface CardRecord {
    id: string;
    name: string;
    url: string | null;
    cover: {
        color: string;
    };
    desc: string;
    dueOn?: string;
    badges: {
        attachments: number;
        comments?: number;
    };
    contentPaths?: string[];
    contentTypes?: string[];
}
export default CardRecord;

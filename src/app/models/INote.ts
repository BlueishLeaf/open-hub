export interface INote {
    id?: string;
    authorEmail: string;
    authorId: string;
    content: string;
    timestamp: Date;
    repository: string;
}

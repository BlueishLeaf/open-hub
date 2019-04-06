export interface INote {
    id?: string;
    authorEmail: string;
    authorName: string;
    authorId: string;
    content: string;
    timestamp: Date;
    repository: string;
}

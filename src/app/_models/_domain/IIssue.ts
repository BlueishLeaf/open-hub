import { IGithubUser } from './IGithubUser';

export interface IIssue {
    id: number;
    number: number;
    title: string;
    user: IGithubUser;
    labels: any[];
    state: string;
    comments: number;
    created_at: Date;
    body: string;
}

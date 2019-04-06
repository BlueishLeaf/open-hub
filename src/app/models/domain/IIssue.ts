import { IGithubUser } from './IGithubUser';

export interface IIssue {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    user: IGithubUser;
    labels: any[];
    state: string;
    locked: boolean;
    assignee?: any;
    assignees: any[];
    milestone?: any;
    comments: number;
    created_at: Date;
    updated_at: Date;
    closed_at?: any;
    author_association: string;
    body: string;
}

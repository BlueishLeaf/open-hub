import { ICommit } from './ICommit';
import { IIssue } from './IIssue';
import { INote } from './INote';

export interface IRepoDetail {
    id: number;
    name: string;
    owner: string;
    description: string;
    watchers: number;
    stars: number;
    forks: number;
    commits?: ICommit[];
    issues?: IIssue[];
    notes?: INote[];
}

import { ICommit } from './ICommit';
import { IIssue } from './IIssue';
import { IReview } from './IReview';

export interface IRepoDetail {
    name: string;
    owner: string;
    description: string;
    watchers: number;
    stars: number;
    forks: number;
    commits: ICommit[];
    issues: IIssue[];
    reviews?: IReview[];
}

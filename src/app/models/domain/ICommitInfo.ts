import { ICommitter } from './ICommitter';

export interface ICommitInfo {
    message: string;
    url: string;
    comment_count: number;
    author: ICommitter;
    committer: ICommitter;
}

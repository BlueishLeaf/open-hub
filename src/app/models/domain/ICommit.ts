import { ICommitInfo } from './ICommitInfo';

export interface ICommit {
    sha: string;
    node_id: string;
    url: string;
    commit: ICommitInfo;
}


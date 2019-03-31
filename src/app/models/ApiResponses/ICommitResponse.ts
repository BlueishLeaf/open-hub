import { IUserResponse } from './IUserResponse';
import { ICommitDetailResponse } from './ICommitDetailResponse';

export interface ICommitResponse {
    sha: string;
    node_id: string;
    url: string;
    author: IUserResponse;
    committer: IUserResponse;
    commit: ICommitDetailResponse;
}

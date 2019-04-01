import { ICommitAuthorResponse } from './ICommitAuthorResponse';

export interface ICommitDetailResponse {
    message: string;
    url: string;
    comment_count: number;
    author: ICommitAuthorResponse;
}

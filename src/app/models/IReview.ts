import { IUser } from './IUser';

export interface IReview {
    author: string;
    content: string;
    timestamp: Date;
    repository: string;
}

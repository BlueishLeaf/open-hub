import { IUser } from './IUser';

export interface IReview {
    author: IUser;
    content: string;
    rating: number;
}

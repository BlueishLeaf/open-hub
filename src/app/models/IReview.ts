import { IUser } from './IUser';

export interface IReview {
    author: IUser;
    review: string;
    rating: number;
}

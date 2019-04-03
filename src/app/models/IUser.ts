import { IRepo } from './IRepo';

export interface IUser {
    email: string;
    role: string;
    bookmarks: IRepo[];
}

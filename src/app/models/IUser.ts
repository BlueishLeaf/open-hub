import { IRepo } from './IRepo';

export interface IUser {
    fName: string;
    lName: string;
    email: string;
    bookmarks: IRepo;
}

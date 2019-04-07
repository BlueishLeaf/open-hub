import { ILicense } from './ILicense';
import { IGithubUser } from './IGithubUser';

export interface IRepo {
    id: number;
    name: string;
    owner: IGithubUser;
    description: string;
    commits_url: string;
    issues_url: string;
    created_at: Date;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    forks_count: number;
    open_issues_count: number;
    license: ILicense;
}

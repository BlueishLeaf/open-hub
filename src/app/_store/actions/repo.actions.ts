import { IOrg } from 'src/app/_models/_domain/IOrg';
import { IRepo } from 'src/app/_models/_domain/IRepo';

export class SearchRepos {
    static readonly type = '[Repo] Search Repos';
    constructor(public payload?: string) {}
}

export class SearchReposSuccess {
    static readonly type = '[Repo API] Search Repos Successful';
    constructor(public payload: IRepo[]) {}
}

export class SearchReposFailure {
    static readonly type = '[Repo API] Search Repos Failed';
    constructor(public payload: string) {}
}

export class GetPopularRepos {
    static readonly type = '[Repo] Get Popular Repos';
    constructor(public payload: Date) {}
}

export class GetPopularReposSuccess {
    static readonly type = '[Repo API] Get Popular Repos Success';
    constructor(public payload: IRepo[]) {}
}

export class GetPopularReposFailure {
    static readonly type = '[Repo API] Get Popular Repos Failed';
    constructor(public payload: string) {}
}

export class GetLatestOrgs {
    static readonly type = '[Repo] Get Latest Orgs';
    constructor(public payload: IOrg[]) {}
}

export class GetLatestOrgsSuccess {
    static readonly type = '[Repo API] Get Latest Orgs Successful';
    constructor(public payload: IOrg[]) {}
}

export class GetLatestOrgsFailure {
    static readonly type = '[Repo API] Get Latest Orgs Failed';
    constructor(public payload: string) {}
}

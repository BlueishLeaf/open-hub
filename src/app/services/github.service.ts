import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IOrg } from '../models/IOrg';
import { IOrgResponse } from '../models/ApiResponses/IOrgResponse';
import { IRepo } from '../models/IRepo';
import { ISearchResponse } from '../models/ApiResponses/ISearchResponse';
import { formatDate } from '@angular/common';
import { ISearchQuery } from '../models/ISearchQuery';
import { isNullOrUndefined } from 'util';
import { IRepoResponse } from '../models/ApiResponses/IRepoResponse';
import { ICommitResponse } from '../models/ApiResponses/ICommitResponse';
import { IIssueResponse } from '../models/ApiResponses/IIssueResponse';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  baseUrl = 'https://api.github.com/';

  constructor(private _http: HttpClient) { }

  // Retrieves a set of organizations and sorts them by their member count.
  getTopOrgs(): Observable<IOrg[]> {
    const organizations: IOrg[] = [];
    const params = new HttpParams().set('since', '100');
    this._http.get<IOrgResponse[]>(this.baseUrl + 'organizations', {params: params}).subscribe(orgs => {
      orgs.forEach(org => {
        const newOrg: IOrg = {
          title: org.login,
          description: org.description,
          avatarUrl: org.avatar_url,
          url: org.url
        };
        organizations.push(newOrg);
      });
    });
    return of(organizations);
  }

  // Retrieve the top repos created since a given date ordered by their star count
  getPopularRepos(createdOn: Date): Observable<IRepo[]> {
    const formattedDate = formatDate(createdOn.toISOString(), 'yyyy-MM-dd', 'en-US');
    const repositories: IRepo[] = [];
    const params = new HttpParams().set('q', `created:>=${formattedDate}`).set('sort', 'stars').set('order', 'desc').set('per_page', '8');
    this._http.get<ISearchResponse>(this.baseUrl + 'search/repositories', {params: params}).subscribe(res => {
      res.items.forEach(repo => {
        const newRepo: IRepo = {
          id: repo.id,
          name: repo.name,
          owner: repo.owner.login,
          description: repo.description,
          watchers: repo.watchers_count,
          stars: repo.stargazers_count
        };
        repositories.push(newRepo);
      });
    });
    return of(repositories);
  }

  // Query all repos based on the form in the search component
  searchRepos(searchParams: ISearchQuery): Observable<IRepo[]> {
    const repositories: IRepo[] = [];
    let query = '';
    // Construct the query based on the search parameters
    if (!isNullOrUndefined(searchParams.title)) { query += `${searchParams.title} in:name `; }
    if (!isNullOrUndefined(searchParams.language)) { query += `language:${searchParams.language} `; }
    if (!isNullOrUndefined(searchParams.starThreshold)) { query += `stars:>=${searchParams.starThreshold} `; }
    if (!isNullOrUndefined(searchParams.watcherThreshold)) { query += `watchers:>=${searchParams.watcherThreshold} `; }
    if (!isNullOrUndefined(searchParams.issueThreshold)) { query += `good-first-issues:>=${searchParams.firstIssueThreshold} `; }
    if (!isNullOrUndefined(searchParams.license)) { query += `license:${searchParams.license} `; }
    const params = new HttpParams().set('q', `${query}`).set('per_page', '30');
    this._http.get<ISearchResponse>(this.baseUrl + 'search/repositories', {params: params}).subscribe(res => {
      res.items.forEach(repo => {
        const newRepo: IRepo = {
          id: repo.id,
          name: repo.name,
          owner: repo.owner.login,
          description: repo.description,
          watchers: repo.watchers_count,
          stars: repo.stargazers_count
        };
        repositories.push(newRepo);
      });
    });
    return of(repositories);
  }

  // I almost died while trying to figure this out
  getRepoDetails(id: string): Observable<[IRepoResponse, ICommitResponse[], IIssueResponse[]]> {
    return this._http.get<IRepoResponse>(this.baseUrl + 'repositories/' + id).pipe(
      mergeMap(repo => forkJoin([
        this._http.get<IRepoResponse>(this.baseUrl + 'repositories/' + id),
        this._http.get<ICommitResponse[]>(this.baseUrl + `repos/${repo.owner.login}/${repo.name}/commits`),
        this._http.get<IIssueResponse[]>(this.baseUrl + `repos/${repo.owner.login}/${repo.name}/issues`)]))
    );
  }

  // Fetch a list of repos to show on the browse component when there are no filters
  getNewRepos(): Observable<IRepo[]> {
    const repositories: IRepo[] = [];
    const params = new HttpParams().set('q', 'is:public').set('per_page', '28');
    this._http.get<ISearchResponse>(this.baseUrl + 'search/repositories', {params: params}).subscribe(res => {
      res.items.forEach(repo => {
        const newRepo: IRepo = {
          id: repo.id,
          name: repo.name,
          owner: repo.owner.login,
          description: repo.description,
          watchers: repo.watchers_count,
          stars: repo.stargazers_count
        };
        repositories.push(newRepo);
      });
    });
    return of(repositories);
  }
}

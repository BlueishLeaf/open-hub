import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IOrg } from '../models/IOrg';
import { IOrgResponse } from '../models/ApiResponses/IOrgResponse';
import { IUserResponse } from '../models/ApiResponses/IUserResponse';
import { IRepo } from '../models/IRepo';
import { ISearchResponse } from '../models/ApiResponses/ISearchResponse';
import { formatDate } from '@angular/common';
import { ISearchQuery } from '../models/ISearchQuery';
import { isNullOrUndefined } from 'util';
import { IRepoResponse } from '../models/ApiResponses/IRepoResponse';
import { IRepoDetail } from '../models/IRepoDetail';
import { ICommitResponse } from '../models/ApiResponses/ICommitResponse';
import { ICommit } from '../models/ICommit';
import { IIssueResponse } from '../models/ApiResponses/IIssueResponse';
import { IIssue } from '../models/IIssue';

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
    this._http.get<IOrgResponse[]>(this.baseUrl + 'organizations', {params: params}).toPromise().then(orgs => {
      orgs.forEach(org => {
        this._http.get<IUserResponse[]>(this.baseUrl + 'orgs/' + org.login + '/members').toPromise().then(members => {
          const newOrg: IOrg = {
            title: org.login,
            description: org.description,
            members: members.length,
            avatarUrl: org.avatar_url
          };
          organizations.push(newOrg);
        });
      });
    });
    return of(organizations);
  }

  // Retrieve the top repos created since a given date ordered by their star count
  getPopularRepos(createdOn: Date): Observable<IRepo[]> {
    const formattedDate = formatDate(createdOn, 'YYYY-MM-DD', 'en-EU');
    const repositories: IRepo[] = [];
    const params = new HttpParams().set('q', `created:>=${formattedDate}`).set('sort', 'stars').set('order', 'desc').set('per_page', '8');
    this._http.get<ISearchResponse>(this.baseUrl + 'search/repositories', {params: params}).toPromise().then(res => {
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
    if (!isNullOrUndefined(searchParams.firstIssueThreshold)) { query += `good-first-issues:>=${searchParams.firstIssueThreshold} `; }
    if (!isNullOrUndefined(searchParams.license)) { query += `license:${searchParams.license} `; }
    const params = new HttpParams().set('q', `${query}`).set('per_page', '30');
    this._http.get<ISearchResponse>(this.baseUrl + 'search/repositories', {params: params}).toPromise().then(res => {
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

  // Returns the details of a specific repo. Needs to make seperate API calls to get commits and issues.
  getRepoDetail(id: number): Observable<IRepoDetail> {
    let repoDetail: IRepoDetail;
    this._http.get<IRepoResponse>(this.baseUrl + 'repositories/' + id).toPromise().then(repo => {
      this._http.get<ICommitResponse[]>(this.baseUrl + `repos/${repo.name}/commits`).toPromise().then(commits => {
        const commitList: ICommit[] = [];
        commits.forEach(commit => {
          commitList.push({
            author: commit.author.login,
            message: commit.commit.message,
            comments: commit.commit.comment_count
          });
        });
        this._http.get<IIssueResponse[]>(this.baseUrl + `repos/${repo.name}/issues`).toPromise().then(issues => {
          const issueList: IIssue[] = [];
          issues.forEach(issue => {
            issueList.push({
              title: issue.title,
              author: issue.user.login,
              description: issue.body,
              comments: issue.comments,
              state: issue.state
            });
          });
          repoDetail = {
            name: repo.name,
            owner: repo.owner.login,
            description: repo.description,
            watchers: repo.watchers_count,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            commits: commitList,
            issues: issueList
          };
        });
      });
    });
  return of(repoDetail);
  }

  // Fetch a list of repos to show on the browse component when there are no filters
  getNewRepos(): Observable<IRepo[]> {
    const repositories: IRepo[] = [];
    const params = new HttpParams().set('q', 'is:public').set('per_page', '30');
    this._http.get<ISearchResponse>(this.baseUrl + 'search/repositories', {params: params}).toPromise().then(res => {
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

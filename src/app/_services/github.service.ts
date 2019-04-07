import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IOrg } from '../_models/_domain/IOrg';
import { IQueryResult } from '../_models/_domain/IQueryResult';
import { formatDate } from '@angular/common';
import { IRepo } from '../_models/_domain/IRepo';
import { ICommit } from '../_models/_domain/ICommit';
import { IIssue } from '../_models/_domain/IIssue';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  baseUrl = 'https://api.github.com/';
  OAuthToken = environment.githubOAuthToken;

  constructor(private _http: HttpClient) { }

  // Retrieves a set of organizations and sorts them by their member count.
  getLatestOrgs(): Observable<IOrg[]> {
    const params = new HttpParams().set('since', '100').set('Authorization', 'token ' + this.OAuthToken);
    return this._http.get<IOrg[]>(this.baseUrl + 'organizations', {params: params});
  }

  // Retrieve the top repos created since a given date ordered by their star count
  getPopularRepos(dateCreated: Date): Observable<IQueryResult> {
    const formattedDate = formatDate(dateCreated.toISOString(), 'yyyy-MM-dd', 'en-US');
    const params = new HttpParams()
    .set('q', `created:>=${formattedDate} is:public`)
    .set('sort', 'stars')
    .set('order', 'desc')
    .set('per_page', '8')
    .set('Authorization', 'token ' + this.OAuthToken);
    return this._http.get<IQueryResult>(this.baseUrl + 'search/repositories', {params: params});
  }

  // Query all repos based on the form in the search component
  searchRepos(query?: string): Observable<IQueryResult> {
    const params = new HttpParams().set('q', `${query}`).set('per_page', '28').set('Authorization', 'token ' + this.OAuthToken);
    return this._http.get<IQueryResult>(this.baseUrl + 'search/repositories', {params: params});
  }

  // I almost died while trying to figure this out. Note: Refactor last...
  getRepoDetails(id: string): Observable<[IRepo, ICommit[], IIssue[]]> {
    const params = new HttpParams().set('Authorization', 'token ' + this.OAuthToken);
    return this._http.get<IRepo>(this.baseUrl + 'repositories/' + id, {params: params}).pipe(
      mergeMap(repo => forkJoin([
        this._http.get<IRepo>(this.baseUrl + 'repositories/' + id, {params: params}),
        this._http.get<ICommit[]>(this.baseUrl + `repos/${repo.owner.login}/${repo.name}/commits`, {params: params}),
        this._http.get<IIssue[]>(this.baseUrl + `repos/${repo.owner.login}/${repo.name}/issues`, {params: params})]))
    );
  }
}

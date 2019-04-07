import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INote } from '../_models/_domain/INote';
import { IUser } from '../_models/_domain/IUser';
import { IRepo } from '../_models/_domain/IRepo';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  noteFuncEndpoint = 'https://europe-west1-open-hub-1550107968798.cloudfunctions.net/noteFunc';
  addBookmarkEndpoint = 'https://europe-west1-open-hub-1550107968798.cloudfunctions.net/addBookmark';
  removeBookmarkEndpoint = 'https://europe-west1-open-hub-1550107968798.cloudfunctions.net/removeBookmark';
  getUserEndpoint = 'https://europe-west1-open-hub-1550107968798.cloudfunctions.net/getUser';

  constructor(private _http: HttpClient) { }

  getUser(id: string): Observable<IUser> {
    const params = new HttpParams().set('id', id);
    return this._http.get<IUser>(this.getUserEndpoint, {params: params});
  }

  getNotesForRepo(repoName: string): Observable<INote[]> {
    const params = new HttpParams().set('repo', repoName);
    return this._http.get<INote[]>(this.noteFuncEndpoint, {params: params});
  }

  addNote(note: INote) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(this.noteFuncEndpoint, note, {headers: headers});
  }

  addBookmark(repo: IRepo, id: string) {
    const params = new HttpParams().set('id', id);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<IRepo>(this.addBookmarkEndpoint, repo, {params: params, headers: headers});
  }

  removeBookmark(repo: IRepo, id: string) {
    const params = new HttpParams().set('id', id);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<IRepo>(this.removeBookmarkEndpoint, repo, {params: params, headers: headers});
  }

  getNote(id: string): Observable<INote> {
    const params = new HttpParams().set('id', id);
    return this._http.get<INote>(this.noteFuncEndpoint, {params: params});
  }

  deleteNote(id: string) {
    const params = new HttpParams().set('id', id);
    return this._http.delete(this.noteFuncEndpoint, {params: params});
  }
}

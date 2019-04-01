import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReview } from '../models/IReview';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  reviewFuncEndpoint = 'https://europe-west1-open-hub-1550107968798.cloudfunctions.net/reviewFunc';

  constructor(private _http: HttpClient) { }

  getReviewsForRepo(repo: string): Observable<IReview[]> {
    const params = new HttpParams().set('repo', repo);
    return this._http.get<IReview[]>(this.reviewFuncEndpoint, {params: params});
  }

  addReview(review: IReview) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this._http.post<IReview>(this.reviewFuncEndpoint, review, httpOptions);
  }

  getReview(id: string): Observable<IReview> {
    const params = new HttpParams().set('id', id);
    return this._http.get<IReview>(this.reviewFuncEndpoint, {params: params});
  }

  deleteReview(id: string) {
    const params = new HttpParams().set('id', id);
    return this._http.delete(this.reviewFuncEndpoint, {params: params});
  }

  editReview(id: string, newReview: IReview) {
    const params = new HttpParams().set('id', id);
    return this._http.put<IReview>(this.reviewFuncEndpoint, newReview, {params: params});
  }
}

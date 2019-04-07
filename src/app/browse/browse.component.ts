import { Component, OnInit } from '@angular/core';
import { ISearchQuery } from '../models/domain/ISearchQuery';
import { Store, Select } from '@ngxs/store';
import { RepoState } from '../state-management/states/repo.state';
import { SearchRepos } from '../state-management/actions/repo.actions';
import { Observable } from 'rxjs';
import { IRepo } from '../models/domain/IRepo';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  @Select(RepoState.searched) repositories$: Observable<IRepo[]>;
  repositories: IRepo[];

  constructor(private _store: Store) {}

  ngOnInit() {
    this.repositories$.subscribe(repos => {
      this.repositories = repos;
    });
    if (isNullOrUndefined(this.repositories)) {
      this._store.dispatch(new SearchRepos());
    }
  }

  searchTriggered(event: ISearchQuery) {
    let query = '';
    if (isNullOrUndefined(event)) {
      query = 'is:public';
    } else {
      if (!isNullOrUndefined(event.name)) { query += `${event.name} in:name `; }
      if (!isNullOrUndefined(event.language)) { query += `language:${event.language} `; }
      if (!isNullOrUndefined(event.license)) { query += `license:${event.license} `; }
      if (!isNullOrUndefined(event.minStars || event.maxStars)) {
        if (!isNullOrUndefined(event.minStars && event.maxStars)) {
          query += `stars:${event.minStars}..${event.maxStars} `;
        } else if (!isNullOrUndefined(event.minStars) && isNullOrUndefined(event.maxStars)) {
          query += `stars:>=${event.minStars} `;
        } else if (!isNullOrUndefined(event.maxStars) && isNullOrUndefined(event.minStars)) {
          query += `stars:<=${event.maxStars} `;
        }
      }
      if (!isNullOrUndefined(event.minFirstIssues || event.maxFirstIssues)) {
        if (!isNullOrUndefined(event.minFirstIssues && event.maxFirstIssues)) {
          query += `good-first-issues:${event.minFirstIssues}..${event.maxFirstIssues} `;
        } else if (!isNullOrUndefined(event.minFirstIssues) && isNullOrUndefined(event.maxFirstIssues)) {
          query += `good-first-issues:>=${event.minFirstIssues} `;
        } else if (!isNullOrUndefined(event.maxFirstIssues) && isNullOrUndefined(event.minFirstIssues)) {
          query += `good-first-issues:<=${event.maxFirstIssues} `;
        }
      }
      query += 'is:public';
    }
    this._store.dispatch(new SearchRepos(query));
  }

}

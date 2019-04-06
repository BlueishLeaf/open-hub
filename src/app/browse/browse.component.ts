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

  constructor(private _store: Store) {
    this.repositories$.subscribe(repos => {
      this.repositories = repos;
    });
  }

  ngOnInit() {
    if (isNullOrUndefined(this.repositories)) {
      this._store.dispatch(new SearchRepos());
    }
  }

  searchTriggered(event: ISearchQuery) {
    let query = '';
    if (isNullOrUndefined(event)) {
      query = 'is:public';
    } else {
      if (!isNullOrUndefined(event.title)) { query += `${event.title} in:name `; }
      if (!isNullOrUndefined(event.language)) { query += `language:${event.language} `; }
      if (!isNullOrUndefined(event.starThreshold)) { query += `stars:>=${event.starThreshold} `; }
      if (!isNullOrUndefined(event.watcherThreshold)) { query += `watchers:>=${event.watcherThreshold} `; }
      if (!isNullOrUndefined(event.issueThreshold)) { query += `good-first-issues:>=${event.firstIssueThreshold} `; }
      if (!isNullOrUndefined(event.license)) { query += `license:${event.license} `; }
      query += 'is:public';
    }
    this._store.dispatch(new SearchRepos(query));
  }

}

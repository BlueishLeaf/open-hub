import { Component, OnInit } from '@angular/core';
import { TimePeriod } from '../_models/_enums/TimePeriod.enum';
import { IRepo } from '../_models/_domain/IRepo';
import { Select, Store } from '@ngxs/store';
import { RepoState } from '../_store/_states/repo.state';
import { Observable } from 'rxjs';
import { GetPopularRepos } from '../_store/_actions/repo.actions';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {
  TimePeriod = TimePeriod;
  currentDate = new Date();
  @Select(RepoState.popular) repositories$: Observable<IRepo[]>;
  repositories: IRepo[];

  constructor(private _store: Store) {}

  ngOnInit() {
    this.repositories$.subscribe(repos => this.repositories = repos);
    if (isNullOrUndefined(this.repositories)) {
      this.getPopular(TimePeriod.Week);
    }
  }

  getPopular(timePeriod: TimePeriod) {
    let targetDate: Date;
    switch (timePeriod) {
      case TimePeriod.Day:
        targetDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 1);
        break;
      case TimePeriod.Week:
        targetDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 7);
        break;
      case TimePeriod.Month:
        targetDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 30);
        break;
    }
    this._store.dispatch(new GetPopularRepos(targetDate));
  }

}

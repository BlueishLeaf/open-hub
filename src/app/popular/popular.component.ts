import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/github.service';
import { IRepo } from '../models/IRepo';
import { TimePeriod } from './TimePeriod.enum';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {
  TimePeriod = TimePeriod;
  currentDate = new Date();
  repositories: IRepo[];

  constructor(private _repos: GithubService) { }

  ngOnInit() {
    const targetDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 7);
    this._repos.getPopularRepos(targetDate).subscribe(repos => this.repositories = repos);
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
    this._repos.getPopularRepos(targetDate).subscribe(repos => this.repositories = repos);
  }

}

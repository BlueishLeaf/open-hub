import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/github.service';
import { IRepo } from '../models/IRepo';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {
  currentDate = new Date();
  repositories: IRepo[];

  constructor(private _repos: GithubService) { }

  ngOnInit() {
    const targetDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 7);
    this._repos.getPopularRepos(targetDate).subscribe(repos => {
      this.repositories = repos;
    });
  }

  getPopular(period: string) {
    let targetDate: Date;
    switch (period) {
      case 'day':
        targetDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 1);
        break;
      case 'week':
        targetDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 7);
        break;
      case 'month':
        targetDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 30);
        break;
      default:
        targetDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 1);
        break;
    }
    this._repos.getPopularRepos(targetDate).subscribe(repos => {
      this.repositories = repos;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { IRepo } from '../models/IRepo';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  searchedRepos: IRepo[];

  constructor(private _repos: GithubService) { }

  ngOnInit() {
    this._repos.getNewRepos().subscribe(repos => {
      this.searchedRepos = repos;
    });
  }

  searchTriggered(event: IRepo[]) {
    this.searchedRepos = event;
  }

}

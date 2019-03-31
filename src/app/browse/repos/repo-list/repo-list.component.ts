import { Component, OnInit } from '@angular/core';
import { IRepo } from 'src/app/models/IRepo';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit {
  repositories: IRepo[];

  constructor(private _repos: GithubService) { }

  ngOnInit() {
    this._repos.getNewRepos().subscribe(repos => {
      this.repositories = repos;
    });
  }

}

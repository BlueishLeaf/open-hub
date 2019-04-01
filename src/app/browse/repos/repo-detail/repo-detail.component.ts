import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRepoDetail } from 'src/app/models/IRepoDetail';
import { GithubService } from 'src/app/services/github.service';
import { ICommit } from 'src/app/models/ICommit';
import { IIssue } from 'src/app/models/IIssue';

@Component({
  selector: 'app-repo-detail',
  templateUrl: './repo-detail.component.html',
  styleUrls: ['./repo-detail.component.scss']
})
export class RepoDetailComponent implements OnInit {
  repository: IRepoDetail;

  constructor(private _route: ActivatedRoute, private _repos: GithubService) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    this._repos.getRepoDetails(id).subscribe(data => {
      // A looooot of formatting raw data
      const commits: ICommit[] = [];
      data[1].forEach(commit => {
        commits.push({
          author: commit.commit.author.name,
          message: commit.commit.message,
          comments: commit.commit.comment_count
        });
      });
      const issues: IIssue[] = [];
      data[2].forEach(issue => {
        issues.push({
          author: issue.user.login,
          description: issue.body,
          state: issue.state,
          comments: issue.comments,
          title: issue.title
        });
      });
      this.repository = {
        name: data[0].name,
        owner: data[0].owner.login,
        description: data[0].description,
        watchers: data[0].watchers_count,
        stars: data[0].stargazers_count,
        forks: data[0].forks_count,
        commits: commits,
        issues: issues
      };
    });
  }

}

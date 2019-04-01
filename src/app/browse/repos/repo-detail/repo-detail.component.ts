import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRepoDetail } from 'src/app/models/IRepoDetail';
import { GithubService } from 'src/app/services/github.service';
import { ICommit } from 'src/app/models/ICommit';
import { IIssue } from 'src/app/models/IIssue';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';
import { IReview } from 'src/app/models/IReview';

@Component({
  selector: 'app-repo-detail',
  templateUrl: './repo-detail.component.html',
  styleUrls: ['./repo-detail.component.scss']
})
export class RepoDetailComponent implements OnInit {
  repository: IRepoDetail;
  display: string;
  commitLink: string;
  issueLink: string;
  currentReview = '';

  constructor(private _route: ActivatedRoute, private _repos: GithubService, private _db: FirestoreService, private _auth: AuthService) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    this._repos.getRepoDetails(id).subscribe(data => {
      // A looooot of formatting raw data
      const commits: ICommit[] = [];
      data[1].forEach(commit => {
        commits.push({
          author: commit.commit.author.name,
          message: commit.commit.message,
          comments: commit.commit.comment_count,
          sha: commit.sha
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
      this._db.getReviewsForRepo(data[0].name).subscribe(reviews => {
        this.repository = {
          name: data[0].name,
          owner: data[0].owner.login,
          description: data[0].description,
          watchers: data[0].watchers_count,
          stars: data[0].stargazers_count,
          forks: data[0].forks_count,
          commits: commits,
          issues: issues,
          reviews: reviews
        };
      });
    });
    this.display = 'commits';
  }

  addReview() {
    this._auth.getCurrentUser().subscribe(user => {
      const newReview: IReview = {
        content: this.currentReview,
        author: user.email,
        timestamp: new Date(),
        repository: this.repository.name
      };
      this._db.addReview(newReview).subscribe(() => {
        this.repository.reviews.push(newReview);
      });
    });
  }

  editReview() {

  }

  removeReview() {

  }

}

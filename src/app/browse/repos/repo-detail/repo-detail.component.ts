import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRepoDetail } from 'src/app/models/IRepoDetail';
import { GithubService } from 'src/app/services/github.service';
import { ICommit } from 'src/app/models/ICommit';
import { IIssue } from 'src/app/models/IIssue';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';
import { INote } from 'src/app/models/INote';
import { IRepo } from 'src/app/models/IRepo';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-repo-detail',
  templateUrl: './repo-detail.component.html',
  styleUrls: ['./repo-detail.component.scss']
})
export class RepoDetailComponent implements OnInit {
  repoDetails: IRepoDetail;
  repository: IRepo;
  display: string;
  commitLink: string;
  issueLink: string;
  currentNote = '';
  isBookmarked = false;
  isModerator = false;

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
      this._db.getNotesForRepo(data[0].name).subscribe(notes => {
        this.repoDetails = {
          id: data[0].id,
          name: data[0].name,
          owner: data[0].owner.login,
          description: data[0].description,
          watchers: data[0].watchers_count,
          stars: data[0].stargazers_count,
          forks: data[0].forks_count,
          commits: commits,
          issues: issues,
          notes: notes
        };
        this.repository = {
          id: this.repoDetails.id,
          name: this.repoDetails.name,
          owner: this.repoDetails.owner,
          stars: this.repoDetails.stars,
          watchers: this.repoDetails.watchers,
          description: this.repoDetails.description
        };
        if (!isNullOrUndefined(this._auth.getCurrentUser())) {
          this._db.getUser(this._auth.getCurrentUser().uid).subscribe(user => {
            if (user.bookmarks.some(b => b.id === this.repository.id)) {
              this.isBookmarked = true;
            }
            this.isModerator = user.role === 'moderator' ? true : false;
          });
        }
      });
    });
    this.display = 'commits';
  }

  checkLogin(): boolean {
    return this._auth.isLoggedIn() ? true : false;
  }

  addNote() {
    const user = this._auth.getCurrentUser();
    const note: INote = {
      content: this.currentNote,
      authorEmail: user.email,
      authorId: user.uid,
      timestamp: new Date(),
      repository: this.repoDetails.name
    };
    this._db.addNote(note).subscribe(() => {
      this.repoDetails.notes.push(note);
      this.currentNote = '';
    });
  }

  addToBookmarks() {
    this._db.addBookmark(this.repository, this._auth.getCurrentUser().uid).subscribe(() => {
      this.isBookmarked = true;
    });
  }

  canDelete(note: INote): boolean {
    return this.isModerator || note.authorId === this._auth.getCurrentUser().uid;
  }

  removeFromBookmarks() {
    this._db.removeBookmark(this.repository, this._auth.getCurrentUser().uid).subscribe(() => {
      this.isBookmarked = false;
    });
  }

  removeNote(note: INote) {
    this._db.deleteNote(note.id).subscribe(() => {
      this._db.getNotesForRepo(this.repoDetails.name).subscribe(notes => {
        this.repoDetails.notes = notes;
      });
    });
  }

}

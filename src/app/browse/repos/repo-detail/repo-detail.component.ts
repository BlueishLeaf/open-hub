import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from 'src/app/_services/github.service';
import { FirestoreService } from 'src/app/_services/firestore.service';
import { INote } from 'src/app/_models/_domain/INote';
import { isNullOrUndefined } from 'util';
import { Select } from '@ngxs/store';
import { AuthState } from 'src/app/_store/_states/auth.state';
import { DisplayType } from '../../../_models/_enums/DisplayType.enum';
import { Observable } from 'rxjs';
import { ICommit } from 'src/app/_models/_domain/ICommit';
import { IIssue } from 'src/app/_models/_domain/IIssue';
import { IRepo } from 'src/app/_models/_domain/IRepo';

@Component({
  selector: 'app-repo-detail',
  templateUrl: './repo-detail.component.html',
  styleUrls: ['./repo-detail.component.scss']
})
export class RepoDetailComponent implements OnInit {
  @Select(AuthState.user) user$: Observable<firebase.UserInfo>;
  user: firebase.UserInfo;
  DisplayType = DisplayType;
  repository: IRepo;
  commits: ICommit[];
  issues: IIssue[];
  notes: INote[];
  displayType: DisplayType;
  currentNote = '';
  isBookmarked = false;
  isModerator = false;

  constructor(private _route: ActivatedRoute, private _repos: GithubService, private _db: FirestoreService) {}

  ngOnInit() {
    this.user$.subscribe(user => this.user = user);
    const id = this._route.snapshot.params['id'];
    this._repos.getRepoDetails(id).subscribe(res => {
      this.repository = res[0];
      this.commits = res[1];
      this.issues = res[2];
      if (!isNullOrUndefined(this.user)) {
        this._db.getUser(this.user.uid).subscribe(user => {
          this.isBookmarked = user.bookmarks.some(b => b.id === this.repository.id) ? true : false;
          this.isModerator = user.role === 'moderator' ? true : false;
        });
      }
      this.displayType = DisplayType.Commits;
    });
  }

  getNotes() {
    this._db.getNotesForRepo(this.repository.name).subscribe(notes => {
      this.notes = notes;
      this.displayType = DisplayType.Notes;
    });
  }

  addNote() {
    const note: INote = {
      content: this.currentNote,
      authorEmail: this.user.email,
      authorName: this.user.displayName,
      authorId: this.user.uid,
      timestamp: new Date(),
      repository: this.repository.name
    };
    this._db.addNote(note).subscribe(() => {
      this.notes.push(note);
      this.currentNote = '';
    });
  }

  addToBookmarks = () => this._db.addBookmark(this.repository, this.user.uid).subscribe(() => this.isBookmarked = true);

  canDelete = (note: INote): boolean => this.isModerator || note.authorId === this.user.uid;

  removeFromBookmarks = () => this._db.removeBookmark(this.repository, this.user.uid).subscribe(() => this.isBookmarked = false);

  removeNote = (note: INote) => this._db.deleteNote(note.id).subscribe(() => this._db.getNotesForRepo(this.repository.name).subscribe(notes => this.notes = notes));
}

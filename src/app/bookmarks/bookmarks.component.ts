import { Component, OnInit } from '@angular/core';
import { IRepo } from '../models/IRepo';
import { IUser } from '../models/IUser';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  repositories: IRepo[];
  user: firebase.User;
  userDetails: IUser;

  constructor(private _auth: AuthService, private _db: FirestoreService, private _repos: GithubService) { }

  ngOnInit() {
    this.user = this._auth.getCurrentUser();
    this._db.getUser(this.user.uid).subscribe(userDetails => {
      this.userDetails = userDetails;
      this.repositories = userDetails.bookmarks;
    });
  }

}

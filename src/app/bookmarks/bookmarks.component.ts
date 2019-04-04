import { Component, OnInit } from '@angular/core';
import { IRepo } from '../models/IRepo';
import { IUser } from '../models/IUser';
import { FirestoreService } from '../services/firestore.service';
import { Store } from '@ngxs/store';
import { AuthState } from '../state-management/states/auth.state';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  repositories: IRepo[];
  user: firebase.User;
  userDetails: IUser;

  constructor(private _db: FirestoreService, private _store: Store) {
    this.user = this._store.selectSnapshot(AuthState.user);
  }

  ngOnInit() {
    this._db.getUser(this.user.uid).subscribe(userDetails => {
      this.userDetails = userDetails;
      this.repositories = userDetails.bookmarks;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/domain/IUser';
import { FirestoreService } from '../services/firestore.service';
import { Select } from '@ngxs/store';
import { AuthState } from '../state-management/states/auth.state';
import { IRepo } from '../models/domain/IRepo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  @Select(AuthState.user) user$: Observable<firebase.UserInfo>;
  user: firebase.UserInfo;
  repositories: IRepo[];
  userDetails: IUser;

  constructor(private _db: FirestoreService) {}

  ngOnInit() {
    this.user$.subscribe(user => this.user = user);
    this._db.getUser(this.user.uid).subscribe(userDetails => {
      this.userDetails = userDetails;
      this.repositories = userDetails.bookmarks;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { IUser } from '../_models/_domain/IUser';
import { FirestoreService } from '../_services/firestore.service';
import { Select } from '@ngxs/store';
import { AuthState } from '../_store/states/auth.state';
import { IRepo } from '../_models/_domain/IRepo';
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

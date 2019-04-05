import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '../state-management/actions/auth.actions';
import { AuthState } from '../state-management/states/auth.state';
import { IUser } from '../models/IUser';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user: Partial<firebase.UserInfo>;

  constructor(private _store: Store) {}

  ngOnInit() {
    this._store.select(AuthState.user).subscribe(user => {
      this.user = user;
    });
  }

  logout = () => this._store.dispatch(new Logout());

}

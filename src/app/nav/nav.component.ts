import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Logout } from '../_store/_actions/auth.actions';
import { AuthState } from '../_store/_states/auth.state';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Select(AuthState.user) user$: Observable<firebase.UserInfo>;
  user: firebase.UserInfo;
  isLoggedIn: boolean;
  isCollapsed = true;

  constructor(private _store: Store) {}

  ngOnInit() {
    !isNullOrUndefined(this._store.selectSnapshot(AuthState.user)) ? this.isLoggedIn = true : this.isLoggedIn = false;
    this.user$.subscribe(user => !isNullOrUndefined(user) ? this.isLoggedIn = true : this.isLoggedIn = false);
  }

  logout = () => this._store.dispatch(new Logout());
}

import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Logout } from '../_store/_actions/auth.actions';
import { AuthState } from '../_store/_states/auth.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Select(AuthState.user) user$: Observable<firebase.UserInfo>;
  user: firebase.UserInfo;
  isCollapsed = true;

  constructor(private _store: Store) {}

  ngOnInit = () => this.user$.subscribe(user => this.user = user);

  logout = () => this._store.dispatch(new Logout());

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '../state-management/actions/auth.actions';
import { AuthState } from '../state-management/states/auth.state';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user: firebase.User;

  constructor(private _store: Store) {
    this.user = this._store.selectSnapshot(AuthState.user);
  }

  ngOnInit() {
  }

  logout = () => this._store.dispatch(new Logout());

}

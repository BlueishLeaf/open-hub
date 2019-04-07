import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Logout } from '../state-management/actions/auth.actions';
import { AuthState } from '../state-management/states/auth.state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Select(AuthState.user) user$: Observable<firebase.UserInfo>;
  user: Partial<firebase.UserInfo>;
  isCollapsed = true;

  constructor(private _store: Store, private _router: Router) {}

  ngOnInit = () => this.user$.subscribe(user => this.user = user);

  logout() {
    this._router.navigate(['']);
    this._store.dispatch(new Logout());
  }

}

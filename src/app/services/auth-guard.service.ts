import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Store } from '@ngxs/store';
import { AuthState } from '../state-management/states/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _store: Store) { }

  canActivate = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => isNullOrUndefined(this._store.selectSnapshot(AuthState.user)) ? false : true;
}

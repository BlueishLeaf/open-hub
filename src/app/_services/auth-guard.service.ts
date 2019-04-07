import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Store } from '@ngxs/store';
import { AuthState } from '../state-management/states/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _store: Store, private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!isNullOrUndefined(this._store.selectSnapshot(AuthState.user))) {
      return true;
    }
    this._router.navigate(['login']);
    return false;
  }
}

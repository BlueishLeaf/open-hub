import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { AuthService } from 'src/app/_services/auth.service';
import { EmailLogin, Logout, OAuthLogin, Register, LoginSuccess, LoginFailure, AutoLoginSuccess, AutoLoginFailure } from '../_actions/auth.actions';
import { isNullOrUndefined } from 'util';
import { tap, take, takeLast } from 'rxjs/operators';
import * as firebase from 'firebase';

export interface AuthStateModel {
  user?: firebase.UserInfo;
}

@State<AuthStateModel>({
  name: 'auth'
})

export class AuthState implements NgxsOnInit {
  @Selector()
  static user(state: AuthStateModel) { return state.user; }

  constructor(private _auth: AuthService) {}

  async ngxsOnInit({ dispatch }: StateContext<AuthStateModel>) {
    await this._auth.checkSession().then(userStream => {
      if (!isNullOrUndefined(userStream)) {
        userStream.subscribe(user => {
          !isNullOrUndefined(user) ? dispatch(new AutoLoginSuccess(user)) : dispatch(new AutoLoginFailure());
        });
      }
    });
  }

  @Action(EmailLogin)
  emailLogin(ctx: StateContext<AuthStateModel>, { payload }: EmailLogin) {
    return this._auth.emailLogin(payload.email, payload.password).then(res => ctx.dispatch(new LoginSuccess(res.user)));
  }

  @Action(OAuthLogin)
  oAuthLogin(ctx: StateContext<AuthStateModel>, { payload }: OAuthLogin) {
    return this._auth.oAuthLogin(payload).then(res => ctx.dispatch(new LoginSuccess(res.user)));
  }

  @Action(LoginSuccess)
  loginSuccess({ setState }: StateContext<AuthStateModel>, {payload}: LoginSuccess) {
    const user: firebase.UserInfo = {
      email: payload.email,
      uid: payload.uid,
      displayName: payload.displayName,
      photoURL: payload.photoURL,
      phoneNumber: payload.phoneNumber,
      providerId: payload.providerId
    };
    setState({user: user});
  }

  @Action(LoginFailure)
  loginFailure({ setState }: StateContext<AuthStateModel>) {
    setState({});
  }

  @Action(AutoLoginSuccess)
  autoLoginSuccess({ setState }: StateContext<AuthStateModel>, {payload}: AutoLoginSuccess) {
    const user: firebase.UserInfo = {
      email: payload.email,
      uid: payload.uid,
      displayName: payload.displayName,
      photoURL: payload.photoURL,
      phoneNumber: payload.phoneNumber,
      providerId: payload.providerId
    };
    setState({user: user});
  }

  @Action(AutoLoginFailure)
  autoLoginFailure({ setState }: StateContext<AuthStateModel>) {
    setState({});
  }

  @Action(Register)
  register({ dispatch }: StateContext<AuthStateModel>, { payload }: Register) {
    return this._auth.register(payload.email, payload.password).then(res => {
      this._auth.updateProfile(res.user, payload.displayName, '').then(() => dispatch(new LoginSuccess(res.user)));
    });
  }

  @Action(Logout)
  logout = ({ setState }: StateContext<AuthStateModel>) => this._auth.logout().then(() => setState({}))
}

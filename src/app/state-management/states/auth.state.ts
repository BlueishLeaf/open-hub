import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AuthService } from 'src/app/services/auth.service';
import { EmailLogin, Logout, OAuthLogin, Register, LoginSuccess } from '../actions/auth.actions';

export interface AuthStateModel {
  user?: firebase.User;
}

@State<AuthStateModel>({
  name: 'auth'
})

export class AuthState {
  @Selector()
  static user(state: AuthStateModel) { return state.user; }

  constructor(private _auth: AuthService) {}

  @Action(EmailLogin)
  emailLogin(ctx: StateContext<AuthStateModel>, { payload }: EmailLogin) {
    return this._auth.emailLogin(payload.email, payload.password).then(res => ctx.dispatch(new LoginSuccess(res.user)));
  }

  @Action(OAuthLogin)
  oAuthLogin(ctx: StateContext<AuthStateModel>, { payload }: OAuthLogin) {
    return this._auth.oAuthLogin(payload.provider).then(res => ctx.dispatch(new LoginSuccess(res.user)));
  }

  @Action(LoginSuccess)
  loginSuccess({ patchState }: StateContext<AuthStateModel>, {payload}: LoginSuccess) {
    patchState({user: payload});
  }

  @Action(Register)
  register({ patchState }: StateContext<AuthStateModel>, { payload }: Register) {
    return this._auth.register(payload.email, payload.password).then(res => {
      this._auth.updateProfile(res.user, payload.displayName, '').then(() => patchState({ user: res.user }));
    });
  }

  @Action(Logout)
  logout = ({ setState }: StateContext<AuthStateModel>) => this._auth.logout().then(() => setState({}))
}

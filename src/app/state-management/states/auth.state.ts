import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AuthService } from 'src/app/services/auth.service';
import { EmailLogin, Logout, OAuthLogin, Register, LoginSuccess } from '../actions/auth.actions';
import { IUser } from 'src/app/models/IUser';

export interface AuthStateModel {
  user?: firebase.UserInfo;
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
  loginSuccess({ setState }: StateContext<AuthStateModel>, {payload}: LoginSuccess) {
    // Need to create new smaller user info object, as firebase throws a monster back
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

  @Action(Register)
  register({ setState }: StateContext<AuthStateModel>, { payload }: Register) {
    return this._auth.register(payload.email, payload.password).then(res => {
      this._auth.updateProfile(res.user, payload.displayName, '').then(() => setState({ user: res.user }));
    });
  }

  @Action(Logout)
  logout = ({ setState }: StateContext<AuthStateModel>) => this._auth.logout().then(() => setState({}))
}

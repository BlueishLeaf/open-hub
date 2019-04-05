import { LoginProvider } from 'src/app/models/LoginProvider.enum';

export class EmailLogin {
    static readonly type = '[Auth] Login with email and password';
    constructor(public payload: { email: string, password: string }) {}
}

export class OAuthLogin {
    static readonly type = '[Auth] Login with OAuth provider';
    constructor(public payload: { provider: LoginProvider }) {}
}

export class LoginSuccess {
    static readonly type = '[Auth] Login successful';
    constructor(public payload: firebase.UserInfo) {}
}

export class Register {
    static readonly type = '[Auth] Register with email';
    constructor(public payload: { email: string, password: string, displayName: string }) {}
}

export class Logout {
    static readonly type = '[Auth] Logout';
}

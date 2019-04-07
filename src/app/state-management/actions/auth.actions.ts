import { LoginProvider } from 'src/app/_models/_enums/LoginProvider.enum';

export class EmailLogin {
    static readonly type = '[Auth] Email Login';
    constructor(public payload: { email: string, password: string }) {}
}

export class OAuthLogin {
    static readonly type = '[Auth] OAuth Login';
    constructor(public payload: LoginProvider) {}
}

export class LoginSuccess {
    static readonly type = '[Auth API] Login Successful';
    constructor(public payload: firebase.UserInfo) {}
}

export class LoginFailure {
    static readonly type = '[Auth API] Login Failed';
}

export class Register {
    static readonly type = '[Auth] Register';
    constructor(public payload: { email: string, password: string, displayName: string }) {}
}

export class Logout {
    static readonly type = '[Auth] Logout';
}

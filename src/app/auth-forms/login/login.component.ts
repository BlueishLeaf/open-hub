import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { EmailLogin, OAuthLogin } from 'src/app/state-management/actions/auth.actions';
import { LoginProvider } from 'src/app/models/LoginProvider.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginProvider = LoginProvider;
  loginForm: FormGroup;
  email: string;
  password: string;

  constructor(private _fb: FormBuilder, private _store: Store) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.loginForm.valueChanges.subscribe(data => {
      this.email = data.email;
      this.password = data.password;
    });
  }

  emailLogin = () => this._store.dispatch(new EmailLogin({ email: this.email, password: this.password }));

  oAuthLogin = (provider: LoginProvider) => this._store.dispatch(new OAuthLogin({ provider }));

}

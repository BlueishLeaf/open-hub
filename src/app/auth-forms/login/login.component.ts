import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string;
  password: string;

  constructor(private _fb: FormBuilder, private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
    if (this._auth.isLoggedIn()) {
      this._router.navigate(['browse']);
    }
    this.loginForm = this._fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.loginForm.valueChanges.subscribe(data => {
      this.email = data.email;
      this.password = data.password;
    });
  }

  login() {
    this._auth.emailLogin(this.email, this.password);
  }

  facebookLogin() {
    this._auth.facebookLogin();
  }

  githubLogin() {
    this._auth.githubLogin();
  }

  googleLogin() {
    this._auth.googleLogin();
  }

}

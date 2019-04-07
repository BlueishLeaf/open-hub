import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Register } from 'src/app/_store/_actions/auth.actions';
import { AuthState } from 'src/app/_store/_states/auth.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Select(AuthState.user) user$: Observable<firebase.UserInfo>;
  registerForm: FormGroup;
  fName: string;
  lName: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(private _fb: FormBuilder, private _store: Store) { }

  ngOnInit() {
    this.registerForm = this._fb.group({
      fName: ['', [Validators.required, Validators.maxLength(30)]],
      lName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
    });
    this.registerForm.valueChanges.subscribe(data => {
      this.fName = data.fName;
      this.lName = data.lName;
      this.email = data.email;
      this.password = data.password;
      this.confirmPassword = data.confirmPassword;
    });
  }

  register = () => this._store.dispatch(new Register({email: this.email, password: this.password, displayName: `${this.fName} ${this.lName}`}));

}

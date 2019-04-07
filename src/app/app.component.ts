import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { Logout, LoginSuccess } from './_store/_actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _router: Router, private _actions: Actions) {}

  ngOnInit () {
    this._actions.pipe(ofActionDispatched(Logout)).subscribe(() => this._router.navigate(['login']));
    this._actions.pipe(ofActionDispatched(LoginSuccess)).subscribe(() => this._router.navigate(['bookmarks']));
  }

}

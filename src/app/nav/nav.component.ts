import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  logout() {
    this._auth.logout();
    this._router.navigate(['']);
  }

}

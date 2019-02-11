import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navVisible = true;

  constructor(private _router: Router) {}

  toggleNav ($event: boolean): void {
    this.navVisible = $event;
  }

}

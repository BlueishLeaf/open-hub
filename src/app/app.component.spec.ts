import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { WelcomeComponent } from './welcome/welcome.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterOutlet,
        NavComponent,
        WelcomeComponent,
        RouterLink
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

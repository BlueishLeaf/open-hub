import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './_store/states/auth.state';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const FireAuthMock = {
    auth: of(null),
    authState: of({
      uid: 'abcdefg',
      displayName: 'John Smith',
      email: 'johnsmith@example.com'
    })
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgbModule,
        HttpClientModule,
        NgxsModule.forRoot([AuthState])
      ],
      declarations: [
        AppComponent,
        NavComponent
      ],
      providers: [
        { provide: AngularFireAuth, useValue: FireAuthMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', async(() => {
    expect(comp).toBeTruthy();
  }));
});

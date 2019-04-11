import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { NgxsModule, Actions, ofActionDispatched} from '@ngxs/store';
import { AuthStateModel, AuthState } from '../_store/_states/auth.state';
import {Observable, of} from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from '@angular/fire/auth';
import {Register} from '../_store/_actions/auth.actions';

describe('NavComponent', () => {
  let actions$: Observable<any>;
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  const sampleUserInfo: firebase.UserInfo = {
    uid: 'asdf',
    email: 'johnsmith@example.com',
    displayName: 'John Smith',
    phoneNumber: null,
    photoURL: null,
    providerId: null
  };

  const sampleAuthState: AuthStateModel = {
    user: sampleUserInfo
  };

  const fireAuthMock = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgbModule,
        NgxsModule.forRoot([AuthState])
      ],
      declarations: [NavComponent],
      providers: [
        {provide: AngularFireAuth, useValue: fireAuthMock},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    actions$ = TestBed.get(Actions);
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'user$', {writable: true});
    component.user$ = of(sampleAuthState.user);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the logout action to state', () => {
    actions$.pipe(ofActionDispatched(Register)).subscribe(action => expect(action).toBeTruthy());
  });
});

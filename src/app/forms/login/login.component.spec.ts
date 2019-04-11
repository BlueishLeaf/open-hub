import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Actions, NgxsModule, ofActionDispatched} from '@ngxs/store';
import { AuthState } from 'src/app/_store/_states/auth.state';
import { AngularFireAuth } from '@angular/fire/auth';

import {Observable, of} from 'rxjs';
import {EmailLogin} from '../../_store/_actions/auth.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let actions$: Observable<any>;

  const fireAuthMock = {
    emailLogin: of(null)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgxsModule.forRoot([AuthState])
      ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: AngularFireAuth, useValue: fireAuthMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    actions$ = TestBed.get(Actions);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the login action to state with a payload containing an email and password', () => {
    component.loginForm = new FormGroup({
      email: new FormControl('johnsmith@openhub.com'),
      password: new FormControl('Hunter2')
    });
    component.emailLogin();
    actions$.pipe(ofActionDispatched(EmailLogin)).subscribe( action => expect(action.payload).toBe({ email: 'johnsmith@openhub.com', password: 'Hunter2' }));
  });
});

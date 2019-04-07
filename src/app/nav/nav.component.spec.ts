/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavComponent } from './nav.component';
import { Store, NgxsModule } from '@ngxs/store';
import { AuthStateModel, AuthState } from '../state-management/states/auth.state';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from '@angular/fire/auth';

describe('NavComponent', () => {
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

  const fireAuthMock = {
  };

  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgbModule,
        NgxsModule.forRoot([AuthState])
      ],
      declarations: [ NavComponent ],
      providers: [
        { provide: AngularFireAuth, useValue: fireAuthMock },
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
    store.reset({AuthState: sampleAuthState});
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'user$', { writable: true });
    component.user$ = of(sampleAuthState.user);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

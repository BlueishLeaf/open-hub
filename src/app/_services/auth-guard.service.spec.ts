import { TestBed, inject } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { Store, NgxsModule } from '@ngxs/store';
import { AuthStateModel, AuthState } from '../_store/_states/auth.state';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';

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

describe('Service: AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([AuthState])
      ],
      providers: [
        AuthGuardService,
        { provide: AngularFireAuth, useValue: fireAuthMock },
      ]
    });
    store = TestBed.get(Store);
    store.reset({AuthState: sampleAuthState});
  });

  it('should ...', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));

  // it('should return false if there is no user in the state', inject([AuthGuardService], (service: AuthGuardService) => {
  //   const spy = spyOn(store, 'select').and.returnValue(of(false));
  //   expect(service).toBeFalsy();
  // }));

  // it('should return true if there is a user in the state', inject([AuthGuardService], (service: AuthGuardService) => {
  //   const spy = spyOn(store, 'select').and.returnValue(of(true));
  //   expect(service).toBeTruthy();
  // }));
});

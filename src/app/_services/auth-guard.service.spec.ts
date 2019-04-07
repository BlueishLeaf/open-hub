import { TestBed, inject } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { Store, NgxsModule } from '@ngxs/store';
import { AuthStateModel, AuthState } from '../_store/_states/auth.state';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';

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
});

import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';

const sampleUser = {
  uid: 'test', email: 'test@gmail.com', 'displayName': 'name'
};

const fireAuthMock = {
  auth: {
    signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve(true)),
    createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword').and.returnValue(Promise.resolve(true)),
    signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword').and.returnValue(Promise.resolve(true)),
    signInWithPopup: jasmine.createSpy('signInWithPopup').and.returnValue(Promise.resolve(true))
  },
  authState: of(sampleUser),
  currentUser: of(sampleUser)
};

describe('Service: Auth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: fireAuthMock },
      ]
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should successfully perform an email login', inject([AuthService], (service: AuthService) => {
    service.emailLogin('killian@gmail.com', 'Asdf1234');
    expect(fireAuthMock.auth.signInWithEmailAndPassword).toHaveBeenCalled();
  }));
});

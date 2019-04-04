import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { LoginProvider } from '../models/LoginProvider.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _afAuth: AngularFireAuth) {}

  async oAuthLogin(loginProvider: LoginProvider): Promise<firebase.auth.UserCredential> {
    switch (loginProvider) {
      case LoginProvider.Google:
        return await this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      case LoginProvider.Facebook:
        return await this._afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
      case LoginProvider.GitHub:
        return await this._afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
    }
  }

  emailLogin = async (email: string, password: string): Promise<firebase.auth.UserCredential> => await this._afAuth.auth.signInWithEmailAndPassword(email, password);

  register = async (email: string, password: string): Promise<firebase.auth.UserCredential> => await this._afAuth.auth.createUserWithEmailAndPassword(email, password);

  updateProfile = async (userToUpdate: firebase.User, displayName: string, photoUrl: string): Promise<void> => await userToUpdate.updateProfile({displayName: displayName, photoURL: photoUrl});

  logout = async (): Promise<void> => await this._afAuth.auth.signOut();
}

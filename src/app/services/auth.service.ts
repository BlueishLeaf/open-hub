import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

constructor(public afAuth: AngularFireAuth) {
  this.user = this.afAuth.authState;
  this.user.subscribe(user => {
    if (user) {
      this.userDetails = user;
    } else {
      this.userDetails = null;
    }
  });
}

  googleLogin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  facebookLogin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  githubLogin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GithubAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  emailLogin(username: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(username, password).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  register(username: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(username, password).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isLoggedIn() {
    if (this.userDetails !== null) {
      return true;
    } else {
      return false;
    }
  }

  getCurrentUser() {
    return this.user;
  }
}

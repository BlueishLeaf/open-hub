import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private _afStore: AngularFirestore) { }

  createUser(user: object) {
    this._afStore.collection('users').add(user);
  }

  getUser(id: string) {
    return this._afStore.doc('users/' + id).get();
  }

  deleteUser(id: string) {
    this._afStore.doc('users/' + id).delete();
  }

  updateUser(id: string, user: object) {
    this._afStore.doc('users/' + id).update(user);
  }
}

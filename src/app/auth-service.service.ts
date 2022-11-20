import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserModel } from './user-model';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  userData: any;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  async getUserData(uid: string) {
    return await this.afs
      .collection('users')
      .doc(uid)
      .ref.get()
  }

  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  SetUserData(user: UserModel) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: UserModel = {
      uid: user.uid,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  login() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  async SignIn(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async isUserLogedIn() {
    const token = localStorage.getItem('access')
    // console.log(token);
    if (token) {
      const decodedToken: any = await this.jwtDecoder(token);
        if (Date.now() > decodedToken.exp * 1000) {
          console.log('expired');
          return false
        } else {
          console.log('valid');
          return true
        }
    } else {
      console.log('no token');

      return false
    }
  }

  async jwtDecoder(token: string) {
    return await jwt_decode(token);
  }

  logout() {
    localStorage.clear()
  }
}

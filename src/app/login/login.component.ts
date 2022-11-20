import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
// import { addDoc, Firestore, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loadingValue: boolean = false;
  hideLogin: boolean = true;
  userData: any;
  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl('', {
      validators: [Validators.required],
    }),
    password: new UntypedFormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  constructor(
    public authenticationService: AuthServiceService,
    public afs: AngularFirestore,
    public router: Router
  ) {}

  ngOnInit(): void {
    // this.authenticationService.isUserLogedIn()
  }

  async login() {
    this.loadingValue = true;
    this.hideLogin = false;
    let userUID: string = '';
    await this.authenticationService
      .SignIn(this.loginForm.value.username, this.loginForm.value.password)
      .then(async (data: any) => {
        localStorage.setItem('access', data.user.multiFactor.user.accessToken);
        localStorage.setItem('userId', data.user.uid);
        userUID = data.user.uid;

setTimeout(() => {
  
  location.reload()
}, 1500);

      })
      .catch((err) => {
        console.error(err);
      });
    if (userUID!) {
      await this.getUserData(userUID);
    }
  }

  async getUserData(uid: string) {
    await this.afs
      .collection('users')
      .doc(uid)
      .ref.get()
      .then((doc: any) => {
        if (doc) {

          // console.log('Document data:', doc.data());
          localStorage.setItem('role', doc.data().role);
          localStorage.setItem('userName', doc.data().name);
          // console.log(doc.data());
          // debugger
          // console.log(doc.data().role);
          if (doc.data().role === 'Admin') {
            this.router.navigate(['/recruiter_area/post'])
          } else {
            this.router.navigate(['/jobseeker_area/profile'])
          }
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }
}

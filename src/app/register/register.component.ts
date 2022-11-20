import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new UntypedFormGroup({
    name: new UntypedFormControl('', { validators: [Validators.required] }),
    email: new UntypedFormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    username: new UntypedFormControl('', { validators: [Validators.required] }),
    password: new UntypedFormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    role: new UntypedFormControl('Admin', { validators: [Validators.required] }),
  });

  constructor(
    public authenticationService: AuthServiceService,
    public afs: AngularFirestore,
    public router: Router,
    ) {}

  ngOnInit(): void {}

  async register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      await this.authenticationService
      .SignUp(this.registerForm.value.email, this.registerForm.value.password)
      .then(async (data: any) => {
        // this.route.navigate(['/']);
        console.log(data.user);
        console.log({...this.registerForm.value, uid: data.user.uid});
        // debugger
        await this.authenticationService.SetUserData({...this.registerForm.value, uid: data.user.uid}).then(()=> {
          this.router.navigate(['/login'])
        })
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }

}

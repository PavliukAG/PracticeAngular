import { Component, OnInit } from '@angular/core';
import { ExternalRoutingService } from '../../core/externalRouting.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
 public form: any;
 
  constructor(public service: ExternalRoutingService, private toastr: ToastrService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName : ['', Validators.required],
      email : ['', Validators.email],
      fullName : [''],
      passwords : this.fb.group({
        password : ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword : ['', Validators.required]
      }, {validators: this._comparePasswords})
    });
  }

  private _comparePasswords(fb: FormGroup) {
    const confirmPswrdCtrl = fb.get('confirmPassword');
    // passwordMismatch
    // confirmPswrdCtrl.errors = { passwordMismatch:true}
    if ( confirmPswrdCtrl.errors === null || confirmPswrdCtrl.errors.passwordMismatch) {
      if (fb.get('password').value !== confirmPswrdCtrl.value) {
        confirmPswrdCtrl.setErrors({ passwordMismatch: true});
      } else {
        confirmPswrdCtrl.setErrors(null);
      }
    }
  }

  onSubmit() {
    let body = {
      userName: this.form.value.userName,
      email: this.form.value.email,
      fullName: this.form.value.fullName,
      password: this.form.value.passwords.password
    };

    this.service.register(body).subscribe (
      (res: any) => {
        if (res.succeeded) {
          this.form.reset();
          this.toastr.success('New user created!', 'Registration successful.');
          this.router.navigateByUrl('/user/login');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('userName is already taken.', 'Registration failed.');
                break;
              default:
                this.toastr.error(element.description, 'Registration failed.');
                break;

            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}

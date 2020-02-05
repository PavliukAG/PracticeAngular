import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
readonly BaseURL = 'http://localhost:54374/api';
 // ----------------------------------------------------------------------  relocation
  formModel = this.fb.group({
    UserName : ['', Validators.required],
    Email : ['', Validators.email],
    FullName : [''],
    Passwords : this.fb.group({
      Password : ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword : ['', Validators.required]
    }, {validators: this.comparePasswords})
  });
  comparePasswords(fb: FormGroup) {
    const confirmPswrdCtrl = fb.get('ConfirmPassword');
    // passwordMismatch
    // confirmPswrdCtrl.errors = { passwordMismatch:true}
    if ( confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value !== confirmPswrdCtrl.value) {
        confirmPswrdCtrl.setErrors({ passwordMismatch: true});
      } else {
        confirmPswrdCtrl.setErrors(null);
      }
    }
  }
  // rename variables ------------------------------------------------------------- ! 
  register() {
    let body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password,

    };
    return this.http.post( this.BaseURL + '/Auth/Register', body);
  }
  login(formData){
    return this.http.post( this.BaseURL + '/Auth/Login', formData);
  }
  getUserProfile(){
    return this.http.get(this.BaseURL + '/UserProfile');
  }
}

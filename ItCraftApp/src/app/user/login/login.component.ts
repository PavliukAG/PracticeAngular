import {Toast, ToastrService} from 'ngx-toastr';
import { UserProfileService } from './../../core/userProfile.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

formModel = {
  userName : '',
  password : ''
}
  constructor(private service: UserProfileService, private  router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }
  
  onSubmit(form: NgForm) {
  this.service.login(form.value).subscribe(
    // not any
    (res: any) => {
      // localStorage service +
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/home');
    },
    err => {
      if (err.status === 401) {
        this.toastr.error(err.error, 'Authentication failed.');
      } else {
        console.log(err);
      }

    }
    );
  }
}

import {Toast, ToastrService} from 'ngx-toastr';
import { ExternalRoutingService } from './../../core/externalRouting.service';
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
  constructor(private service: ExternalRoutingService, private  router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }
  
  onSubmit(form: NgForm) {
  this.service.login(form.value).subscribe(
    (res: any) => {
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/home');
    },
    err => {
      if (err.status == 400) {
        this.toastr.error('Incorrect userName or password', 'Authentication failed.');
      } else {
        console.log(err);
      }

    }
    );
  }
}

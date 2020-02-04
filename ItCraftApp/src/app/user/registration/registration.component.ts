import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';
import {element} from 'protractor';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.service.register().subscribe(
      (res: any ) => {
        if (res.succeeded) {
          this.service.formModel.reset();
        } else {
          res.errors.forEach( element => {
            switch (element.code) {
              case 'DuplicateUserName':
                // Username is already taken
                break;
              default:
                // Registration failed
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

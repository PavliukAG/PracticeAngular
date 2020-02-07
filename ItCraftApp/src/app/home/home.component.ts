import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {TableComponent} from './table/table.component'
import { UserProfileService} from './../core/userProfile.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
userDetails;

@Input() public showStatistic !: boolean;

constructor(private router: Router, private service: UserProfileService) { }

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res =>{
        this.userDetails = res;
        this.showStatistic = false;
      },
      err => {
        console.log(err);
      },
    )
  }

onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
}
}

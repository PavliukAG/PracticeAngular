import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '../../core/services/user-profile.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

interface ProfileData {
  userName: string;
  fullName: string;
  email: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userDetails: ProfileData;
  constructor(private router: Router, private userService: UserProfileService, private lStorage : LocalStorageService ) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      (res : ProfileData) => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      });
  }

  public onLogout() {
    this.lStorage.removeToken();
    this.router.navigate(['/user/login']);
  }
}

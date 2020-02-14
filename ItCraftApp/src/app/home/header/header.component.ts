import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '../../core/services/user-profile.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { MatDialog } from '@angular/material';
import { ProfileInfoDialogComponent } from './profile-info-dialog/profile-info-dialog.component';
import { IUserData } from 'src/app/core/models/IUserData';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userDetails: IUserData;
  
  constructor(private router: Router, private userService: UserProfileService, private lStorage : LocalStorageService, private matDialog: MatDialog) { }
  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      (res : IUserData) => {
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

  public showProfile() {
      let dialog = this.matDialog.open(ProfileInfoDialogComponent, {
        data: this.userDetails
      });
  }

}

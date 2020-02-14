import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/core/models/Product';
import { IUserData } from 'src/app/core/models/IUserData';

@Component({
  selector: 'app-profile-info-dialog',
  templateUrl: './profile-info-dialog.component.html',
  styleUrls: ['./profile-info-dialog.component.css']
})
export class ProfileInfoDialogComponent implements OnInit {

  data: IUserData;

  constructor(private dialog: MatDialogRef<ProfileInfoDialogComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public _data: IUserData) {
    this.data = _data;
  }

  ngOnInit() {
  }

}

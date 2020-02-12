import { Component, OnInit, Injectable, Input } from '@angular/core';
import { MatDialog} from '@angular/material';
import { AccountingComponent } from './accounting/accounting.component';

@Component({
  selector: 'app-productStatistics',
  templateUrl: './productStatistics.component.html',
  styleUrls: ['./productStatistics.component.css']
})

@Injectable()
export class ProductStatisticsComponent implements OnInit {

  @Input() public item;

  constructor(public dialog: MatDialog) { 
  }

  public openDialogAC() {
    const dialogRef = this.dialog.open(AccountingComponent, {
      height: '50%',
      width: '80%',
    });
    dialogRef.componentInstance.item = this.item;
  }

  ngOnInit() {
  }

}

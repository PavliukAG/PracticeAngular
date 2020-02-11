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

  @Input() item;

  constructor(public dialog: MatDialog) { 
  }

  openDialogAC() {
    const dialogRef = this.dialog.open(AccountingComponent, {
      height: '90%',
      width: '80%',
    });
    // dialogRef.afterOpen(this.item);

  }

  ngOnInit() {
  }

}

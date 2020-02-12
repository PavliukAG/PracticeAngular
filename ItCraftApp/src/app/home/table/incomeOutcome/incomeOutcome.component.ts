import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-incomeOutcome',
  templateUrl: './incomeOutcome.component.html',
  styleUrls: ['./incomeOutcome.component.css']
})
export class IncomeOutcomeComponent implements OnInit {

  item: any;

  constructor(public dialog: MatDialogRef<IncomeOutcomeComponent>) {} 
 
  ngOnInit() {
  }

}

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

enum OperationType {
  Income, Outcome
}

@Component({
  selector: 'app-incomeOutcome',
  templateUrl: './incomeOutcome.component.html',
  styleUrls: ['./incomeOutcome.component.css']
})
export class IncomeOutcomeComponent implements OnInit {

  item: any;
  value: number;
  operation: string; 

  constructor(public dialog: MatDialogRef<IncomeOutcomeComponent>) {} 
 
  ngOnInit() {
  }

  submit() {
    let model = {
      productId: this.item.productId,
      operationType: 0,
      amount: Number(this.value),
      dateTime: "2020-01-01"
    }
    this.dialog.close(model)
  }

  close() {
    this.dialog.close(undefined);
  }

}

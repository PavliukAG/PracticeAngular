import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-incomeOutcome',
  templateUrl: './incomeOutcome.component.html',
  styleUrls: ['./incomeOutcome.component.css']
})
export class IncomeOutcomeComponent implements OnInit {

  item: any;
  value: number;
  currentOperationType: number = 0; 

  constructor(public dialog: MatDialogRef<IncomeOutcomeComponent>) {} 
  
  operationTypes = [{id:0, name: "Income"}, {id:1, name: "Outcome"}];

  ngOnInit() {
  }

  submit() {
    let model = {
      productId: this.item.productId,
      operationType: Number(this.currentOperationType),
      amount: Number(this.value),
      dateTime: new Date()
    }
    this.dialog.close(model)
  }

  close() {
    this.dialog.close(undefined);
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-income-outcome-form',
  templateUrl: './income-outcome-form.component.html',
  styleUrls: ['./income-outcome-form.component.css']
})
export class IncomeOutcomeFormComponent implements OnInit {

  item: any;
  value: number;
  currentOperationType: number = 0; 

  constructor(private dialog: MatDialogRef<IncomeOutcomeFormComponent>) {} 
  
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

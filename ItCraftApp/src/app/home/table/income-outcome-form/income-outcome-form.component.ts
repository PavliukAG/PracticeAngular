import { Component, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/core/models/Product';

@Component({
  selector: 'app-income-outcome-form',
  templateUrl: './income-outcome-form.component.html',
  styleUrls: ['./income-outcome-form.component.css']
})
export class IncomeOutcomeFormComponent {

  public product: Product;
  public value: number;
  currentOperationType: number = 0;
   
  public _productName : string;
  get productName(): string { 
    let productName = this.product.name; 
    return (productName.length >= 15)? `${productName.slice(0, 12)}...` : productName;
  }


  constructor(private dialog: MatDialogRef<IncomeOutcomeFormComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: Product) {
    this.product = data;
  }
  
  operationTypes = [{id:0, name: "Income"}, {id:1, name: "Outcome"}];

  public submit() {
    let model = {
      productId: this.product.productId,
      operationType: Number(this.currentOperationType),
      amount: Number(this.value),
      dateTime: new Date()
    }
    this.dialog.close(model)
  }

  public close() {
    this.dialog.close(undefined);
  }

}

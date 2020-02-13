import { Component, OnInit, Injectable, Input } from '@angular/core';
import { MatDialog} from '@angular/material';
import { AccountingComponent } from './accounting/accounting.component';
import { Product } from 'src/app/core/models/Product';

@Component({
  selector: 'app-product-statistic',
  templateUrl: './product-statistic.component.html',
  styleUrls: ['./product-statistic.component.css']
})

export class ProductStatisticComponent {

  constructor(private dialog: MatDialog) { 
  }

  @Input() currentProduct : Product;

  private _productName : string;
  get productName(): string { 
    let productName = this.currentProduct.name; 
    return (productName.length >= 15)? `${productName.slice(0, 12)}...` : productName;
  }

  private _totalCost : number;
  get totalCost(): number {
    return Number((this.currentProduct.price * this.currentProduct.count).toFixed(2));
  }
  
  public openDialogAC() {
    this.dialog.open(AccountingComponent, {
      height: '90%',
      width: '80%',
      data: this.currentProduct
    });
  }
}

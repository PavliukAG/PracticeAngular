import { Component, OnInit, Injectable, Input, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AccountingHttpService } from '../../../core/services/accounting-http.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/models/Product';
import { Accounting } from 'src/app/core/models/Accounting';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})

export class AccountingComponent implements OnInit {
  public accountingList: Accounting[]; 
  public currentProduct: Product;
   
  constructor(private dialog: MatDialogRef<AccountingComponent>, private dataService: AccountingHttpService, private toastr: ToastrService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Product
    ) {
      this.currentProduct = data;
    }

    public close() {
      this.dialog.close();
    }

    ngOnInit() {
      this.initAccounting();
    }

    public initAccounting() {
      this.dataService.getAccounting(this.currentProduct.productId).subscribe(
        (res : Accounting[]) => {
          this.accountingList = res;
        },
        err => {
          console.log(err);
      });
    }

    public getDate(dateString : string):string {
      let date = new Date(dateString)
      return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

}

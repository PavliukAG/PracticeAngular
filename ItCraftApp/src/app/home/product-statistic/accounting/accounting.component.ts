import { Component, OnInit, Injectable, Input, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AccountingHttpService } from '../../../core/services/accounting-http.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/models/Product';
import { Accounting } from 'src/app/core/models/Accounting';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})

export class AccountingComponent implements OnInit {
  public accountingList: Accounting[]; 
  public currentProduct: Product;
   
  constructor(private dialog: MatDialogRef<AccountingComponent>, private dataService: AccountingHttpService, private toastr: ToastrService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Product) {
      this.currentProduct = data;
    }

    public close() {
      this.dialog.close();
    }

    ngOnInit() {
      this.initAccounting(7);
    }

    private toggle = [true, true, true, true]

    public initAccounting(sortOrder: number) {
      let idtoggle = Math.ceil(sortOrder/2)
      this.toggle[idtoggle] = !this.toggle[idtoggle]
      
      sortOrder += this.toggle[idtoggle]? 0:1;

      this.dataService.getAccounting(this.currentProduct.productId, sortOrder).subscribe(
        (res : HttpResponse<Accounting[]>) => {
          this.accountingList = res.body;
        },
        err => {
          console.log(err);
      });
    }
}

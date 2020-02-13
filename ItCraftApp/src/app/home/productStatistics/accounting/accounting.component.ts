import { Component, OnInit, Injectable, Input } from '@angular/core';
import { MatDialogRef} from '@angular/material';
import { AccountingHttpService } from '../../../core/services/accounting-http.service';
import { ToastrService } from 'ngx-toastr';

class Accounting {
  Id: number;
  operationType: number;
  userName: string;
  amount: number;
  dateTime: Date;
}

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})

@Injectable()

export class AccountingComponent implements OnInit {
 public accountingList: Accounting[]; 

  constructor(public dialog: MatDialogRef<AccountingComponent>, private dataService: AccountingHttpService, private toastr: ToastrService) { }

  close() {
    this.dialog.close();
  }

  item: any; 

  ngOnInit() {
    this.initAccounting();
  }

  public initAccounting() {
    this.dataService.getAccounting(this.item.productId).subscribe(
      (res : Accounting[]) => {
        this.accountingList = res;
      },
      err => {
        console.log(err);
    });
  }

  public getDate(line : string):string {
    let date = new Date(line)
    return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}       ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

}

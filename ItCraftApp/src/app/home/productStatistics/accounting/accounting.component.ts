import { Component, OnInit, Injectable, Input } from '@angular/core';
import { MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})

@Injectable()

export class AccountingComponent implements OnInit {

 @Input() item;

  constructor(public dialog: MatDialogRef<AccountingComponent>) { }

  close() {
    this.dialog.close();
  }

  ngOnInit() {
  }

}

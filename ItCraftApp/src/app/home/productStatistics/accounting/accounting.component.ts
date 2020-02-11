import { Component, OnInit, Injectable, Input } from '@angular/core';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})

@Injectable()

export class AccountingComponent implements OnInit {

  item = {
    name : "test",
    price: 20
  }

  constructor() { }

  ngOnInit() {
  }

}

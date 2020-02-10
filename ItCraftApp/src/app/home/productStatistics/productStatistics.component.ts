import { Component, OnInit, Injectable, Input } from '@angular/core';

@Component({
  selector: 'app-productStatistics',
  templateUrl: './productStatistics.component.html',
  styleUrls: ['./productStatistics.component.css']
})

@Injectable()
export class ProductStatisticsComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {
  }

  name : string;
  price : number;
  count : number;
  id : number;

  @Input() initStatistic(model) {
    this.name = model.name;
    this.price = model.price;
    this.count = model.count;
    this.id = model.productId;
  }

}

import { Component, OnInit } from '@angular/core';

class Product {
  name : string;
  price : number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

function generateProducts() {
  return new Product(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), Math.random()*100000);
}

const pageNumber = 0;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  
  countOfProductsOnPage = 10;

  items = new Array(new Product("Samsung", 8000), new Product("Apple", 12000));

  public getSegment(start : number, end: number) {
    return this.items.slice(start, end);
  }

  constructor() { 
    for (let i = 0; i < 1000; i++) {
      this.items.push(generateProducts());
    }
  }

  ngOnInit() {
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

class Product {
  name : string;
  price : number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

function generateProducts(id : number) {
  return new Product((id+1) + ' ' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), Math.random()*100000);
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  constructor(private service: UserService) { 
    for (let i = 0; i < 100; i++) {
      // this.items.push(generateProducts(i));
    }
  }

  items;
  
  ngOnInit() {
    this.service.getProducts().subscribe(
      res =>{
        this.items = res;
      },
      err => {
        console.log(err);
      },
    )
  }
  
  public range(n: number, startFrom: number): number[] {
    return [...Array(n).keys()].map(i => i + startFrom);
  }
  
  private pageNumber = 1;
  private pageSize = 2;

  public getSegment(pageSize, pageNumber) {
    return this.items;
    // return this.items.slice((pageNumber-1)*pageSize, (pageNumber-1)*pageSize + pageSize);
  }

  public nextPage() {
    this.pageNumber++;
  }

  public prevPage() {
    this.pageNumber--;
  }

}

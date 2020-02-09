import { Component, OnInit, ContentChild } from '@angular/core';
import { ExternalRoutingService } from 'src/app/core/externalRouting.service';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  private items;
  public pageNumber: number = 1;
  public pageSize = 'ALL';
  public edit = false;

  constructor(private service: ExternalRoutingService, private toastr: ToastrService) {
   }

  initTable() {
    this.service.getProducts().subscribe(
      res => {
        this.items = res;
      },
      err => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.generateHardcodeProduct();
    this.initTable();
  }
  // ! This method for testing without backend
  generateHardcodeProduct() {
    this.items = []
    for (let i = 0; i < 100; i++) {
      let model = {name : `Product${i}`, 
      price : Math.round((Math.random()*1000)*100) / 100, 
      productId : i, 
      count : 0}
      this.items.push(model)
    }
  }

  public getSegmentOfList() {
    if (String(this.pageSize) == "ALL") {
      return this.items;
    }
    let start: number = (this.pageNumber - 1) * Number(this.pageSize);
    let end: number = Number(start) + Number(this.pageSize);
    return this.items.slice(start, end);
  }

  public nextPage() {
    let limit = this.getPageLimit()
    this.pageNumber += this.pageNumber < limit ? 1 : 0;
    if (this.pageNumber > limit) this.pageNumber = limit;
  }

  public prevPage() {
    this.pageNumber -= this.pageNumber > 1 ? 1 : 0;
  }

  public getPagesCount() {
    if (this.pageSize == "ALL") return this.pageSize;
    return Math.ceil(this.items.length / Number(this.pageSize));
  }

  private getPageLimit() {
    return Math.ceil(this.items.length / Number(this.pageSize));
  }

  public showStatistics(item) {
    let res = "Name: " + item.name
      + "\nPrice: " + item.price
      + "\nCount: " + item.count
      + "\nTotal Price: " + Number(item.count * item.price)
      + "\nId: " + item.productId;
    + "\n"
    alert(res)

    let info = {
      name : item.name,
      price: item.price,
      count: item.count,
      totalPrice: Number(item.count * item.price),
      id: item.productId
    }

    // statistics ------------------------------

  }
  public remove(item) {
    let res = confirm("Are you sure you want to delete the item?");
    if (res) {
      this.service.removeProduct(item.productId).subscribe(
        (res: any) => {
          this.toastr.success(`${res.name} was successfully deleted`);
        },
        err => {
          if (err.status == 400) {
            this.toastr.error(err.error, 'Operation failed.');
          } else {
            console.log(err);
          }
    
        }
        );
      let id = this.items.indexOf(item)
      this.items = this.items.slice(0, id).concat(this.items.slice(id + 1, this.items.length));
    } 
  }


  directionName = true;
  public sortName() {
    this.directionName = !this.directionName;
    this.items.sort(function(a,b) {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1
      else return 0;
    });
    if (this.directionName) this.items.reverse();
  }

  
  directionPrice = true;
  public sortPrice() {
    this.directionPrice = !this.directionPrice;
    this.items.sort(function(a,b) {
      if (a.price > b.price) return 1;
      if (b.price > a.price) return -1
      else return 0;
    });
    if (this.directionPrice) this.items.reverse();
  }

  public clearDB() {
    let res = confirm("Clear all database?")
    if (res) {
      this.items.forEach(item => {
        this.service.removeProduct(item.productId).subscribe();
      });
      this.items = [];
    }
  }

  public changeStateProduct() {
    this.edit = !this.edit;
  }

}

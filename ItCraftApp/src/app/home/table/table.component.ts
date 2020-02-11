import { Component, OnInit, ContentChild, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ExternalRoutingService } from 'src/app/core/externalRouting.service';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from '../home.component';
import { ProductStatisticsComponent } from '../productStatistics/productStatistics.component';
import { MatDialog} from '@angular/material';
import { IncomeOutcomeComponent } from './incomeOutcome/incomeOutcome.component';
import { DeleteProductComponent } from './deleteProduct/deleteProduct.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  @Input() items;
  public pageNumber: number = 1;
  public pageSize = 5;
  // ! --------------------- THIS IS HARDCODE
  public edit = new Array<boolean>();

  @Output() changeCurrentItemTable = new EventEmitter();
  
  constructor(private service: ExternalRoutingService, private toastr: ToastrService, public dialog: MatDialog) {
  
  }
  
  openDialogIOC() {
    this.dialog.open(IncomeOutcomeComponent);

  }

  openDialogDPC() {
    this.dialog.open(DeleteProductComponent);
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
  }

  public getSegmentOfList() {
    if (String(this.pageSize) == "ALL") {
      return this.items;
    }
    let start: number = (this.pageNumber - 1) * Number(this.pageSize);
    let end: number = Number(start) + Number(this.pageSize);
    let result = this.items.slice(start, end);
    if (this.edit.length != result.length) this.edit = new Array<boolean>(result.length);
    return result;
  }

  public nextPage() {
    let limit = this.getPageLimit()
    this.pageNumber += this.pageNumber < limit ? 1 : 0;
    if (this.pageNumber > limit) this.pageNumber = limit;
  }

  public prevPage() {
    this.pageNumber -= this.pageNumber > 1 ? 1 : 0;
  }

  public get pagesCount() {
    if (String(this.pageSize) == "ALL") return this.pageSize;
    return Math.ceil(this.items.length / Number(this.pageSize));
  }

  private getPageLimit() {
    return Math.ceil(this.items.length / Number(this.pageSize));
  }

  public showStatistics(item) {
    this.changeCurrentItemTable.emit(item);
  }

  public updateProduct(item, th) {
    alert(th);

    this.service.updateProduct(item).subscribe(
      (res: any) => {
        alert('updated')
      });
  }

  public remove(item) {
    let res = confirm("Are you sure you want to delete the item?");
    if (res) {
      this.service.removeProduct(item.productId).subscribe(
        (res: any) => {
          this.toastr.success(`${res.name} was successfully deleted`);
        },
        err => {
          switch (err.status) {
            case 400:
              this.toastr.error(err.error, 'Operation failed.');
              break;
            default:
              break;
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
    this.items.sort(function (a, b) {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1
      else return 0;
    });
    if (this.directionName) this.items.reverse();
  }


  directionPrice = true;
  public sortPrice() {
    this.directionPrice = !this.directionPrice;
    this.items.sort(function (a, b) {
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

  public commandLine: string;
  public command() {
    switch (this.commandLine) {
      case "clear":
        this.clearDB();
        break;
      case "additem": {
        let model = {
          name: "test" + Math.ceil(Math.random() * 100),
          price: Math.random() * 100
        }
          this.service.addProduct(model).subscribe();
          this.toastr.info("Create random product")
        break;
      }
    }
  }

  public changeStateProduct(id: number) {
    this.edit[id] = !this.edit[id];
  }
}

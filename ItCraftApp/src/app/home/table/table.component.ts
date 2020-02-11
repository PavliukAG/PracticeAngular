import { Component, OnInit, ContentChild, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ExternalRoutingService } from 'src/app/core/externalRouting.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog} from '@angular/material';
import { IncomeOutcomeComponent } from './incomeOutcome/incomeOutcome.component';
import { DeleteProductComponent } from './deleteProduct/deleteProduct.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  constructor(private service: ExternalRoutingService, private toastr: ToastrService, public dialog: MatDialog) {
  }
  @Input() items;
  product;
  public pageNumber = 1;
  public pageSize  = 5;

  @Output() changeCurrentItemTableEmitter = new EventEmitter();
  @Output() removeItemEmitter = new EventEmitter();

  private directionName = true;
  private directionPrice = true;

  public commandLine: string;

  openDialogIncomeOutcome() {
    this.dialog.open(IncomeOutcomeComponent);

  }

  openDialogDeleteProduct(item) {
    let dialog = this.dialog.open(DeleteProductComponent);

    
    dialog.afterClosed().subscribe(result => {
      if (result) this.remove(item);
    })
  }

  ngOnInit() {
  }

  public getSegmentOfList() {
    if (this.pageNumber > this.getPageLimit()) this.pageNumber--;
    const start: number = (this.pageNumber - 1) * Number(this.pageSize);
    const end: number = Number(start) + Number(this.pageSize);
    const result = this.items.slice(start, end);
    return result;
  }

  public nextPage() {
    const limit = this.getPageLimit();
    this.pageNumber += this.pageNumber < limit ? 1 : 0;
    // if (this.pageNumber > limit) this.pageNumber = limit;
  }

  public prevPage() {
    this.pageNumber -= this.pageNumber > 1 ? 1 : 0;
  }

  public pagesCount() {
    if (String(this.pageSize) == null) { return this.pageSize; }
    return Math.ceil(this.items.length / Number(this.pageSize));
  }

  private getPageLimit() {
    return Math.ceil(this.items.length / Number(this.pageSize));
  }

  public showStatistics(item) {
    this.changeCurrentItemTableEmitter.emit(item);
  }

  public remove(item) {
    this.removeItemEmitter.emit(item);
  }
  
  public sortName() {
    this.directionName = !this.directionName;
    this.items.sort((a, b) => {
      if (a.name > b.name) { return 1; }
      if (b.name > a.name) { return -1; } else { return 0; }
    });
    if (this.directionName) { this.items.reverse(); }
  }
  public sortPrice() {
    this.directionPrice = !this.directionPrice;
    this.items.sort((a, b) => {
      if (a.price > b.price) { return 1; }
      if (b.price > a.price) { return -1; } else { return 0; }
    });
    if (this.directionPrice) { this.items.reverse(); }
  }

  public clearDB() {
    const res = confirm('Clear all database?')
    if (res) {
      this.items.forEach(item => {
        this.service.removeProduct(item.productId).subscribe();
      });
      this.items = [];
    }
  }
  public command() {
    switch (this.commandLine) {
      case 'clear':
        this.clearDB();
        break;
      case 'additem': {
        const model = {
          name: 'test' + Math.ceil(Math.random() * 100),
          price: Math.random() * 100
        };
        this.service.addProduct(model).subscribe();
        this.toastr.info('Create random product');
        break;
      }
    }
  }
  
  public editProduct(item) {
    this.product = item;
  }

  public updateProduct() {
    if (this.product.id !== null) {
      this.service.updateProduct(this.product).subscribe(res => {
        this.toastr.success(`${this.product.name} was updated`)
        this.cancel();
      }, err => {
        if (err.status === 400) {
          this.toastr.error(err.error, 'Operation failed.');
        } else {
          console.log(err);
        }
      } );
    }
  }
  
  public cancel() {
    this.product = null;
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductHttpService } from '../../core/product-http.service';
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

  constructor(private service: ProductHttpService, private toastr: ToastrService, public matDialog: MatDialog) {
  }
  @Input() public items: any;
  public currentEditable: any;
  public pageNumber = 1;
  public pageSize  = 10;

  @Output() changeCurrentItemTableEmitter = new EventEmitter();
  @Output() removeItemEmitter = new EventEmitter();
  @Output() updateItemEmitter = new EventEmitter();
  @Output() addAccountingItemEmitter = new EventEmitter(); 

  private sortDirectionName = true;
  private sortDirectionPrice = true;

  openDialogIncomeOutcome(item) {
    let dialog = this.matDialog.open(IncomeOutcomeComponent);
    dialog.componentInstance.item = item;

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.addAccountingItemEmitter.emit(result);
      }
    });
  }

  openDialogDeleteProduct(item) {
    let dialog = this.matDialog.open(DeleteProductComponent);
    
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
  }
  
  public prevPage() {
    this.pageNumber -= this.pageNumber > 1 ? 1 : 0;
  }

  public pagesCount() {
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
  // todo: need to combine two methods below
  public sortName() {
    this.sortDirectionName = !this.sortDirectionName;
    this.items.sort((a, b) =>  a.name === b.name ? 0 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
    if (this.sortDirectionName) { this.items.reverse(); }
  }
  
  public sortPrice() {
    this.sortDirectionPrice = !this.sortDirectionPrice;
    this.items.sort((a, b) => {
      if (a.price > b.price) { return 1; }
      if (b.price > a.price) { return -1; } else { return 0; }
    });
    if (this.sortDirectionPrice) { this.items.reverse(); }
  }
  
  public editProduct(item) {
    this.currentEditable = item;
  }

  public updateProduct() {
    if (this.currentEditable.productId !== null) {
      this.currentEditable.price = Number(this.currentEditable.price) 
      if (this.isValid(this.currentEditable)) {
        this.updateItemEmitter.emit(this.currentEditable);
        this.cancel();
      } else {
        this.toastr.error("Invalid data");
      }
    }
  }
  
  public cancel() {
    this.currentEditable = null;
  }

  isValid(item): boolean {
    let reg = /[0-9]*[.,]?[0-9]{0,2}$/;
    if (reg.exec(item.price) && (item.name.length <=50) && (Number(item.price) > 0)) {
      return true;
    }
    return false;
  }
}

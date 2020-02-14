import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductHttpService } from './../../core/services/product-http.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { IncomeOutcomeFormComponent } from './income-outcome-form/income-outcome-form.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { Product } from 'src/app/core/models/Product';

class IinitTableConfig {
  _pageSize: number;
  _sortOrder: number;
  _pageNumber: number;
  constructor (pS:number, sO:number, pN:number) {
    this._sortOrder = sO;
    this._pageSize = pS;
    this._pageNumber = pN;
  }
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {

  constructor(private service: ProductHttpService, private toastr: ToastrService, private matDialog: MatDialog) {
  }

  @Input() public items: Product[];
  @Input() public pageNumber: number;
  @Input() public pageSize: number;
  @Input() public sortOrder: number;
  @Input() public totalPages: number;
  public currentEditable: Product;

  @Output() changeCurrentItemTableEmitter = new EventEmitter<Product>();
  @Output() removeItemEmitter = new EventEmitter<Product>();
  @Output() updateItemEmitter = new EventEmitter<Product>();
  @Output() addAccountingItemEmitter = new EventEmitter();
  @Output() initProductsEmitter = new EventEmitter<IinitTableConfig>();

  private sortDirectionName = 0;
  private sortDirectionPrice = 0;

  openDialogIncomeOutcome(item: Product) {
    let dialog = this.matDialog.open(IncomeOutcomeFormComponent, { data: item });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.addAccountingItemEmitter.emit(result);
      }
    });
  }

  openDialogDeleteProduct(item) {
    let dialog = this.matDialog.open(DeleteConfirmComponent);

    dialog.afterClosed().subscribe(result => {
      if (result) this.remove(item);
    })
  }

  public nextPage() {
    this.pageNumber += this.pageNumber<this.totalPages?1:0;
    this.initProductsEmitter.emit(
      new IinitTableConfig(this.pageSize, this.sortOrder, this.pageNumber));
  }

  public prevPage() {
    this.pageNumber -= this.pageNumber>1?1:0;
    this.initProductsEmitter.emit(
      new IinitTableConfig(this.pageSize, this.sortOrder, this.pageNumber));
  }

  public showStatistics(item) {
    this.changeCurrentItemTableEmitter.emit(item);
  }

  public remove(item) {
    this.removeItemEmitter.emit(item);
  }
  // todo: need to combine two methods below
  public sortBy(colId:number) {
    if (colId === 0) {
      this.sortOrder = 0 + this.sortDirectionName;
      this.sortDirectionName = (this.sortDirectionName + 1) % 2;
      this.sortDirectionPrice = 0;
    }
    if (colId === 1) {
      this.sortOrder = 2 + this.sortDirectionPrice;
      this.sortDirectionPrice = (this.sortDirectionPrice + 1) % 2;
      this.sortDirectionName = 0;
    }
    this.initProductsEmitter.emit(
      new IinitTableConfig(this.pageSize, this.sortOrder, this.pageNumber));
  }

  public editProduct(item) {
    this.currentEditable = JSON.parse(JSON.stringify(item));
  }

  public updateProduct() {
    if (this.currentEditable.productId !== null) {
      this.currentEditable.name = this.currentEditable.name.trim();
      if (this.isValid(this.currentEditable) && typeof (Number(this.currentEditable.price)) === 'number') {
        this.updateItemEmitter.emit(this.currentEditable);
        let id = this.items.findIndex(x => x.productId === this.currentEditable.productId);
        this.items[id] = JSON.parse(JSON.stringify(this.currentEditable));
        this.cancel();
      } else {
        this.toastr.error('Invalid data');
      }
    }
  }

  public cancel() {
    this.currentEditable = null;
  }

  private isValid(item): boolean {
    let reg = /[0-9]*[.,]?[0-9]$/;
    if ((item.name.length <= 50)
      && (item.name.length > 0)
      && (Number(item.price) > 0)
      && (Number(item.price) < 10000)
      && reg.exec(item.price)) {
      return true;
    }
    return false;
  }

  public changePageSize() {
    let config: IinitTableConfig;
    config = { _pageSize: this.pageSize, _sortOrder: this.sortOrder, _pageNumber: undefined };
    this.initProductsEmitter.emit(config);
  }

}

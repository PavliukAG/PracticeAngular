import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductHttpService } from './../../core/services/product-http.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog} from '@angular/material';
import { IncomeOutcomeFormComponent } from './income-outcome-form/income-outcome-form.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { Product } from 'src/app/core/models/Product';

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
  @Output() updateTable = new EventEmitter();

  private sortDirectionName = true;
  private sortDirectionPrice = true;

  openDialogIncomeOutcome(item:Product) {
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
    this.currentEditable = JSON.parse(JSON.stringify(item));
  }

  public updateProduct() {
    if (this.currentEditable.productId !== null) {
      if (this.isValid(this.currentEditable) && typeof(Number(this.currentEditable.price)) === 'number') {
        this.updateItemEmitter.emit(this.currentEditable);
        let id = this.items.findIndex(x => x.productId === this.currentEditable.productId);
        this.items[id] = JSON.parse(JSON.stringify(this.currentEditable));
        this.cancel();
      }
    }
  }

  public cancel() {
      this.currentEditable = null;
  }
 
  isValid(item): boolean {
    let reg = /[0-9]*[.,]?[0-9]$/;
    if ((item.name.length <=50) 
    && (item.name.length > 0)
    && (Number(item.price) > 0) 
    && (Number(item.price) < 10000)
    && reg.exec(item.price)) {
      return true;
    }
    return false;
  }
}

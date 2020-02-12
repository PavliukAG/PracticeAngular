import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() public items: any;
  public currentEditable: any;
  public pageNumber = 1;
  public pageSize  = 10;

  @Output() changeCurrentItemTableEmitter = new EventEmitter();
  @Output() removeItemEmitter = new EventEmitter();

  private sortDirectionName = true;
  private sortDirectionPrice = true;

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
    this.items.sort((a, b) => {
      if (a.name > b.name) { return 1; }
      if (b.name > a.name) { return -1; } else { return 0; }
    });
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
    if (this.currentEditable.id !== null) {
      this.service.updateProduct(this.currentEditable).subscribe(res => {
        this.toastr.success(`${this.currentEditable.name} was updated`)
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
    this.currentEditable = null;
  }
}

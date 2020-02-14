import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductHttpService } from '../core/services/product-http.service';
import { ToastrService } from 'ngx-toastr';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { AccountingHttpService } from '../core/services/accounting-http.service';
import { Product } from '../core/models/Product';
import { Config } from 'protractor';
import { HttpResponse } from '@angular/common/http';
import { ConfigTablePagination } from './ConfigTablePagination';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  public products: Product[];
  public currentItem: Product;
  public editItem: Product;

  public tablePageSize:number = 10;
  public tableSortOrder:number = 0;
  public tablePageNumber:number = 1;
  public tableTotalPages:number;

  @ViewChild(AddProductFormComponent,  {static: false}) addComponent: AddProductFormComponent; 

  constructor(private dataService: ProductHttpService, private accountingService: AccountingHttpService, private toastr: ToastrService) { }

  ngOnInit() {
    this.initProducts(this.tablePageSize, this.tableSortOrder, this.tablePageNumber);
  }

  public initProducts(_pageSize: number, _sortOrder: number, _pageNumber?: number) {
    let config = { pageSize: _pageSize, 
      sortOrder: _sortOrder, 
      pageNumber: _pageNumber }
      
      this.dataService.getProducts(config).subscribe(
      (res : HttpResponse<Product[]>) => {
        let head = res.headers.get('Pagination');
        let postConfig : ConfigTablePagination;
        postConfig = JSON.parse(head);
        this.tablePageSize = postConfig.PageSize;
        this.tableSortOrder = postConfig.SortOrder;
        this.tablePageNumber = postConfig.PageNumber;
        this.tableTotalPages = postConfig.TotalPages;
        this.products = res.body;
      },
      err => {
        if (err.status === 400) {
          this.toastr.error(err.error, 'Download table failed');
        } else {
          console.log(err);
        }
      });
    }

    public initProductsDecorator(config : {_pageSize: number, _sortOrder: number, _pageNumber: number}) {
      this.initProducts(config._pageSize, config._sortOrder, config._pageNumber);
    }

    public addProductItem(model) {
      this.dataService.addProduct(model).subscribe(
        (res : Product) => {
          this.toastr.success(`${res.name} was added to table`);
          this.addComponent.reset();
          this.initProducts(this.tablePageSize, this.tableSortOrder, this.tablePageNumber);
        },
        err => {
          if (err.status === 400) {
            this.toastr.error(err.error, 'Operation failed.');
          } else {
            console.log(err);
          }
        }
      );
    }

    public remove(item: Product) {
        this.dataService.removeProduct(item.productId).subscribe(
          (res:object) => {
            this.toastr.success(`${item.name} was successfully deleted`);
            const id = this.products.indexOf(item);
            this.initProducts(this.tablePageSize, this.tableSortOrder);
            this.products = this.products.slice(0, id).concat(this.products.slice(id + 1, this.products.length));
          },
          err => {
            switch (err.status) {
              case 400:
                this.toastr.error(err.error, 'Operation failed.');
                break;
              default:
                break;
          }
        });
  }

  public update(model : Product) {
    model.price = Number(String(model.price).replace(',','.'));
    model.price = Number(model.price.toFixed(2));
    this.dataService.updateProduct(model).subscribe(res => {
      this.toastr.success(`${model.name} was updated`)  
    }, err => {
      if (err.status === 400) {
          this.toastr.error(err.error, 'Operation failed.');
        } else {
          console.log(err);
        }
    });
  }

  public addItemAcounting(model) {
    this.accountingService.addAccounting(model).subscribe(
      (res) => {
        this.toastr.success('Operation was successful');
        this.currentItem.count += model.amount * (model.operationType?-1:1);
        this.initProducts(this.tablePageSize, this.tableSortOrder, this.tablePageNumber);
        this.currentItem = this.products.find((x:Product) => x.productId === this.currentItem.productId);
      },
      err => {
        if (err.status === 400) {
          this.toastr.error(err.error, 'Operation failed.');
        } else {
          console.log(err);
        }
      }
      );
  }

  changeCurrentItem(item: Product) {
    this.currentItem = item;
    this.currentItem.count = item.count;
  }

}

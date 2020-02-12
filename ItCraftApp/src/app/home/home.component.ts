import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductHttpService } from '../core/product-http.service';
import { ToastrService } from 'ngx-toastr';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { AccountingHttpService } from '../core/accounting-http.service';

class Product {
  productId: number;
  name: string;
  price: number;
  count?: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent implements OnInit {
  public products: Product[];
  public currentItem: Product;
  public editItem: Product;
  @ViewChild(AddProductFormComponent,  {static: false}) addComponent: AddProductFormComponent; 

  constructor(private dataService: ProductHttpService, private accountingService: AccountingHttpService, private toastr: ToastrService) { }

  ngOnInit() {
    this.initProducts();
  }

  public initProducts() {
    this.dataService.getProducts().subscribe(
      (res : Product[]) => {
        this.products = res;
        this.currentItem = this.products[this.products.length - 1];
      },
      err => {
        console.log(err);
      });
    }

    public addProductItem(model) {
      this.dataService.addProduct(model).subscribe(
        (res : Product) => {
          this.toastr.success(`${res.name} was added to table`);
          // todo: add reseting form in addForm component 
          this.addComponent.resetForm();
          this.initProducts();
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

    public remove(item) {
        this.dataService.removeProduct(item.productId).subscribe(
          (res: Product) => {
            this.toastr.success(`${res.name} was successfully deleted`);
            const id = this.products.indexOf(item);
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
    model.price = Math.round(model.price*100)/100;
    this.dataService.updateProduct(model).subscribe(res => {
      this.toastr.success(`${model.name} was updated`)  
    }, err => {
      if (err.status === 400) {
          this.toastr.error('Operation failed.');
        } else {
          console.log(err);
        }
    });
  }

  public addItemAcounting(model) {

    
  this.accountingService.addAccounting(model).subscribe(
    (res) => {
      this.toastr.success(`was added to table`);
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
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ExternalRoutingService } from '../core/externalRouting.service';
import { ToastrService } from 'ngx-toastr';
import { AddFormComponent } from './addForm/addForm.component';

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
  @ViewChild(AddFormComponent,  {static: false}) addComponent: AddFormComponent; 

  constructor(private dataService: ExternalRoutingService, private toastr: ToastrService) { }

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

  changeCurrentItem(item: Product) {
    this.currentItem = item;
  }

}

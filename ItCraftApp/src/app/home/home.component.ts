import { Component, OnInit } from '@angular/core';
import { ExternalRoutingService } from '../core/externalRouting.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// todo: add product DTO

export class HomeComponent implements OnInit {
  public products: any;
  public currentItem: any;
  public editItem: any;
  constructor(private dataService: ExternalRoutingService, private toastr: ToastrService) { }


  ngOnInit() {
    this.initProducts();
  }

  public initProducts() {
    this.dataService.getProducts().subscribe(
      res => {
        this.products = res;
        this.currentItem = this.products[this.products.length - 1];
      },
      err => {
        console.log(err);
      });
    }

    public addProductItem(model) {
      this.dataService.addProduct(model).subscribe(
        (res : any) => {
          this.toastr.success(`${model.name} was added to table`);
          // todo: add reseting form in addForm component 
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
          (res: any) => {
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

  changeCurrentItem(item) {
    this.currentItem = item;
  }

}

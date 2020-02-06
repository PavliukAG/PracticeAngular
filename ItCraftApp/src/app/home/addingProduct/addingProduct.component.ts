import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ExternalRoutingService } from './../../core/externalRouting.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addingProduct',
  templateUrl: './addingProduct.component.html',
  styleUrls: ['./addingProduct.component.css']
})
export class AddingProductComponent implements OnInit {

  // public form : FormGroup;

  constructor(private service: ExternalRoutingService, private  router: Router, private toastr: ToastrService) { }

  ngOnInit() {

  }

  onSubmit(form) {

    let productModel = {
      name : String(form.value.name),
      price : Number(form.value.price)
      // name : 'awdawd',
      // price : 2000
    }

    this.service.addProduct(productModel).subscribe(
      (res: any) => {
        if (res.succeeded) { 
    
          // this.router.navigateByUrl('/home');
        } else {
          console.log(res.errors);
          this.toastr.error('unsucceeded ' + productModel.name + " " + productModel.price);
        }
      },
      err => {
        this.toastr.error(productModel.name + " " + productModel.price);
        console.log(err);
      });
  }
}

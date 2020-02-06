import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExternalRoutingService } from './../../core/externalRouting.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addingProduct',
  templateUrl: './addingProduct.component.html',
  styleUrls: ['./addingProduct.component.css']
})
export class AddingProductComponent implements OnInit {

  formModel = {
    name : '',
    price : Number
  }

  constructor(private service: ExternalRoutingService, private  router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    form.value.price = Number(form.value.price);

    this.service.addProduct(form).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/home');
      },
      err => {
        this.toastr.error(form.value.name + " " + form.value.price);
        console.log(err);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExternalRoutingService } from './../../core/externalRouting.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TableComponent } from '../table/table.component';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-addingProduct',
  templateUrl: './addingProduct.component.html',
  styleUrls: ['./addingProduct.component.css']
})
export class AddingProductComponent implements OnInit {

  public formAdding : FormGroup;

  constructor(private service: ExternalRoutingService, private toastr: ToastrService, private fb: FormBuilder) { 
  }

  ngOnInit() {
    this.formAdding = this.fb.group({
      name : ['', Validators.required],
      price : ['', [Validators.required, Validators.pattern(`^[0-9]*[.,]?[0-9]+$`)]],
      count : 0
    });
  }

  addProduct() {
    let model = {
      name : this.formAdding.value.name,
      price : Number(this.formAdding.value.price)
    }
    this.service.addProduct(model).subscribe(
      (res : any) => {
        this.toastr.success(`${model.name} was added to table`);
      },
      err => {
        if (err.status == 400) {
          this.toastr.error(err.error, 'Operation failed.');
        } else {
          console.log(err);
        }
      }
    );
      // ===========================
      

  }
}

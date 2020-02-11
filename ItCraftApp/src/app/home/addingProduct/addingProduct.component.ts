import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExternalRoutingService } from './../../core/externalRouting.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addingProduct',
  templateUrl: './addingProduct.component.html',
  styleUrls: ['./addingProduct.component.css']
})
export class AddingProductComponent implements OnInit {

  public formAdding : FormGroup;

  @Output() eventEmitter = new EventEmitter();

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
      // --------------------------------------------------------------------- replace , on .
      price : Number(String(this.formAdding.value.price).replace(',','.')) 
    }

    this.service.addProduct(model).subscribe(
      (res : any) => {
        this.toastr.success(`${model.name} was added to table`);
        this.formAdding.reset();
      },
      err => {
        if (err.status === 401) {
          this.toastr.error(err.error, 'Operation failed.');
        } else {
          console.log(err);
        }
      }
    );
    this.updateTable();

  }

  updateTable() {
    this.eventEmitter.emit();
  }
}

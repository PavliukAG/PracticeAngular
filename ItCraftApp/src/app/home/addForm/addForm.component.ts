import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ExternalRoutingService } from 'src/app/core/externalRouting.service';
import { ToastrService } from 'ngx-toastr';
import { stringify } from 'querystring';

@Component({
  selector: 'app-addForm',
  templateUrl: './addForm.component.html',
  styleUrls: ['./addForm.component.css']
})
export class AddFormComponent implements OnInit {

  public formAdding : FormGroup;

  @Output() updateTableEmitter = new EventEmitter();

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
      price : Number(String(this.formAdding.value.price).replace(',','.')) 
    }

    this.service.addProduct(model).subscribe(
      (res : any) => {
        this.toastr.success(`${model.name} was added to table`);
        this.formAdding.reset();
        this.updateTable();
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

  updateTable() {
    this.updateTableEmitter.emit();
  }

}

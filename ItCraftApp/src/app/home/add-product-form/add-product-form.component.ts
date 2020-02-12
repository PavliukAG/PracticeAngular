import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {

  private formAdding : FormGroup;

  @Output() addNewProductEmitter = new EventEmitter();

  constructor(private fb: FormBuilder) { 
  }

  ngOnInit() {
    this.formAdding = this.fb.group({
      name : ['', Validators.required],
      price : ['', [Validators.required, Validators.pattern(`^[0-9]*[.,]?[0-9]{0,2}$`)]],
      count : 0
    });
  }

  public resetForm() {
    this.formAdding.reset();
  }

  public sendModel() {
    let model = {
      name : this.formAdding.value.name,
      price : Number(String(this.formAdding.value.price).replace(',','.'))
    }
    this.addNewProductEmitter.emit(model);
  }
}

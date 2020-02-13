import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {

  public form: FormGroup;

  @Output() addNewProduct = new EventEmitter();

  constructor(private fb: FormBuilder) { 
  }

  ngOnInit() {
    this.form = this.fb.group({
      name : ['', [Validators.required, Validators.maxLength(50)]],
      price : ['', [Validators.required, Validators.pattern(`^[0-9]*[.,]?[0-9]{0,2}$`)]],
      count : 0
    });
  }

  public reset() {
    this.form.reset();
  }

  public submit() {
    let model = {
      name : this.form.value.name,
      price : Number(String(this.form.value.price).replace(',','.'))
    }
    this.addNewProduct.emit(model);
  }
}

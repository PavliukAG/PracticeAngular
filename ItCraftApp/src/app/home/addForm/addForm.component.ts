import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addForm',
  templateUrl: './addForm.component.html',
  styleUrls: ['./addForm.component.css']
})
export class AddFormComponent implements OnInit {

  public formAdding : FormGroup;

  @Output() addNewProductEmitter = new EventEmitter();

  constructor(private fb: FormBuilder) { 
  }

  ngOnInit() {
    this.formAdding = this.fb.group({
      name : ['', Validators.required],
      price : ['', [Validators.required, Validators.pattern(`^[0-9]*[.,]?[0-9]+$`)]],
      count : 0
    });
  }

  sendModel() {
    let model = {
      name : this.formAdding.value.name,
      price : Number(String(this.formAdding.value.price).replace(',','.')) 
    }
    this.addNewProductEmitter.emit(model);
  }
}

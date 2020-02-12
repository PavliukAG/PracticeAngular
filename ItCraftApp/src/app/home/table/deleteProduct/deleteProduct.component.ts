import { ProductHttpService} from '../../../core/product-http.service';
import { MatDialogRef} from '@angular/material';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-deleteProduct',
  templateUrl: './deleteProduct.component.html',
  styleUrls: ['./deleteProduct.component.css']
})
export class DeleteProductComponent implements OnInit {
  constructor(private service: ProductHttpService, public dialog: MatDialogRef<DeleteProductComponent>) { }

  ngOnInit() {
  }

  public confirmDelete() {
    this.dialog.close(true);
  }

  public cancel() {
    this.dialog.close(false);
  }

}

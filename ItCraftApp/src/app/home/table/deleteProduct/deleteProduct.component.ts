import { ExternalRoutingService} from '../../../core/externalRouting.service';
import { MatDialog, MatDialogRef} from '@angular/material';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-deleteProduct',
  templateUrl: './deleteProduct.component.html',
  styleUrls: ['./deleteProduct.component.css']
})
export class DeleteProductComponent implements OnInit {
  constructor(private service: ExternalRoutingService, public dialog: MatDialogRef<DeleteProductComponent>) { }

  ngOnInit() {
  }

  public confirmDelete() {
    this.dialog.close(true);
  }

  public cancel() {
    this.dialog.close(false);
  }

}

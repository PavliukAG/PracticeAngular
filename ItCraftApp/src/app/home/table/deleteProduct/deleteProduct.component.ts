import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExternalRoutingService} from '../../../core/externalRouting.service';
import { Component, OnInit, Input, EventEmitter,Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog} from '@angular/material';

@Component({
  selector: 'app-deleteProduct',
  templateUrl: './deleteProduct.component.html',
  styleUrls: ['./deleteProduct.component.css']
})
export class DeleteProductComponent implements OnInit {
  constructor(private service: ExternalRoutingService, public dialog: MatDialog) { }

  @Output() deleteEmitter = new EventEmitter(); 

  ngOnInit() {
  }

  public confirmDelete() {
    this.deleteEmitter.emit();
    this.dialog.closeAll();
  }

}

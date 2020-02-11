import { Component, OnInit, Input } from '@angular/core';import { ExternalRoutingService } from 'src/app/core/externalRouting.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog} from '@angular/material';

@Component({
  selector: 'app-deleteProduct',
  templateUrl: './deleteProduct.component.html',
  styleUrls: ['./deleteProduct.component.css']
})
export class DeleteProductComponent implements OnInit {
  constructor(private service: ExternalRoutingService, private toastr: ToastrService, public dialog: MatDialog) { }

  ngOnInit() {
  }

}

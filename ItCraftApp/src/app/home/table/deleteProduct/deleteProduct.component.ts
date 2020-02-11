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
  @Input() items;

  constructor(private service: ExternalRoutingService, private toastr: ToastrService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  public remove(item) {
    let res = confirm("Are you sure you want to delete the item?");
    if (res) {
      this.service.removeProduct(item.productId).subscribe(
        (res: any) => {
          this.toastr.success(`${res.name} was successfully deleted`);
        },
        err => {
          switch (err.status) {
            case 400:
              this.toastr.error(err.error, 'Operation failed.');
              break;
            default:
              break;
          }
        }
      );
      let id = this.items.indexOf(item)
      this.items = this.items.slice(0, id).concat(this.items.slice(id + 1, this.items.length));
    }
  }

}

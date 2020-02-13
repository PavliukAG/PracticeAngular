import { MatDialogRef} from '@angular/material';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {
  constructor(public dialog: MatDialogRef<DeleteConfirmComponent>) { }

  ngOnInit() {
  }

  public confirmDelete() {
    this.dialog.close(true);
  }

  public cancel() {
    this.dialog.close(false);
  }

}

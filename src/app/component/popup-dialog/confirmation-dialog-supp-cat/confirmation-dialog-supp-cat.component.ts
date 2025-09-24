import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog-supp-cat',
  templateUrl: './confirmation-dialog-supp-cat.component.html',
  styleUrl: './confirmation-dialog-supp-cat.component.css'
})
export class ConfirmationDialogSuppCatComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogSuppCatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}

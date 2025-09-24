import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog-supp-prod',
  templateUrl: './confirmation-dialog-supp-prod.component.html',
  styleUrl: './confirmation-dialog-supp-prod.component.css'
})
export class ConfirmationDialogSuppProdComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogSuppProdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}

import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog-supp-client',
  templateUrl: './confirmation-dialog-supp-client.component.html',
  styleUrl: './confirmation-dialog-supp-client.component.css'
})
export class ConfirmationDialogSuppClientComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogSuppClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}

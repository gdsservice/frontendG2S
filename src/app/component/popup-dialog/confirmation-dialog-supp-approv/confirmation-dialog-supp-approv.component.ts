import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog-supp-approv',
  templateUrl: './confirmation-dialog-supp-approv.component.html',
  styleUrl: './confirmation-dialog-supp-approv.component.css'
})
export class ConfirmationDialogSuppApprovComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogSuppApprovComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}

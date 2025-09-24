import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog-supp-user',
  templateUrl: './confirmation-dialog-supp-user.component.html',
  styleUrl: './confirmation-dialog-supp-user.component.css'
})
export class ConfirmationDialogSuppUserComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogSuppUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}

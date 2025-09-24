import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog-supprimer',
  templateUrl: './confirmation-dialog-supp-dette.component.html',
  styleUrl: './confirmation-dialog-supp-dette.component.css'
})
export class ConfirmationDialogSuppDetteComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogSuppDetteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}

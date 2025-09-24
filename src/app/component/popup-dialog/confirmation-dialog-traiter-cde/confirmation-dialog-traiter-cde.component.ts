import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog-traiter-cde',
  templateUrl: './confirmation-dialog-traiter-cde.component.html',
  styleUrl: './confirmation-dialog-traiter-cde.component.css'
})
export class ConfirmationDialogTraiterCdeComponent {

    constructor(
      public dialogRef: MatDialogRef<ConfirmationDialogTraiterCdeComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close(false);
    }
  
    onYesClick(): void {
      this.dialogRef.close(true);
    }

}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog-supp-banner',
  templateUrl: './confirmation-dialog-supp-banner.component.html',
  styleUrl: './confirmation-dialog-supp-banner.component.css'
})
export class ConfirmationDialogSuppBannerComponent {
    constructor(
      public dialogRef: MatDialogRef<ConfirmationDialogSuppBannerComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close(false);
    }
  
    onYesClick(): void {
      this.dialogRef.close(true);
    }

}

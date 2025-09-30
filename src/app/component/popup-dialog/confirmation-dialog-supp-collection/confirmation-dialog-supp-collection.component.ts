import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog-supp-collection',
  templateUrl: './confirmation-dialog-supp-collection.component.html',
  styleUrl: './confirmation-dialog-supp-collection.component.css'
})
export class ConfirmationDialogSuppCollectionComponent {
    constructor(
          public dialogRef: MatDialogRef<ConfirmationDialogSuppCollectionComponent>,
          @Inject(MAT_DIALOG_DATA) public data: any
        ) {}
      
        onNoClick(): void {
          this.dialogRef.close(false);
        }
      
        onYesClick(): void {
          this.dialogRef.close(true);
        }
    
}

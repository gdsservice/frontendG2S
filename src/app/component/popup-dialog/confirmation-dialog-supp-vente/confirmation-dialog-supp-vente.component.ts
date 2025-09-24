import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-confirmation-dialog-supp-vente',
  templateUrl: './confirmation-dialog-supp-vente.component.html',
  styleUrl: './confirmation-dialog-supp-vente.component.css'
})
export class ConfirmationDialogSuppVenteComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogSuppVenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}

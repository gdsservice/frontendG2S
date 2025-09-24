import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-confirmation-dialog-vente',
  templateUrl: './confirmation-dialog-vente.component.html',
  styleUrl: './confirmation-dialog-vente.component.css',
  imports: [
    MatCard,
    MatCardHeader,
    MatIcon,
    MatCardContent,
    MatCardActions
  ],
  standalone: true
})
export class ConfirmationDialogVenteComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogVenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}

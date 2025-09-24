import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from "@angular/material/dialog";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-confirmation-dialog-approv',
  templateUrl: './confirmation-dialog-approv.component.html',
  styleUrl: './confirmation-dialog-approv.component.css',
  imports: [
    MatCard,
    MatCardHeader,
    MatIcon,
    MatCardContent,
    MatCardActions
  ],
  standalone: true
})
export class ConfirmationDialogApprovComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogApprovComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}

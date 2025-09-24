import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-error-dialog',
  templateUrl: './confirmation-dialog.component.html',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardHeader,
    MatDialogActions,
    MatDialogContent,
    MatIcon,
    MatCardContent,
    MatCardActions,
  ],
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}

import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {LoginService} from "../../../services/login.service";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-valid-dialog',
  templateUrl: './valid-dialog.component.html',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatIcon,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  styleUrl: './valid-dialog.component.css'
})
export class ValidDialogStockComponent {


  constructor(private route: Router, public dialogRef: MatDialogRef<ValidDialogStockComponent>) {
  }

  onClose() {
    this.dialogRef.close();
  }
}

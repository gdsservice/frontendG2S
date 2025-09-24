import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-valid-dialog',
  templateUrl: './valid-dialog.component.html',
  styleUrl: './valid-dialog.component.css'
})
export class ValidDialogComponent {


  constructor(private route: Router, public dialogRef: MatDialogRef<ValidDialogComponent>) {
  }

  onClose() {
    this.dialogRef.close();
  }
}

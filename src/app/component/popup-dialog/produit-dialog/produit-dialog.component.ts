import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-produit-dialog',
  templateUrl: './produit-dialog.component.html',
  styleUrl: './produit-dialog.component.css'
})
export class ProduitDialogComponent {
  produitForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProduitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.produitForm = this.fb.group({
      quantite: [data?.quantite || '', Validators.required],
      reduction: [data?.reduction || ''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.produitForm.valid) {
      this.dialogRef.close(this.produitForm.value);
    }
  }
}

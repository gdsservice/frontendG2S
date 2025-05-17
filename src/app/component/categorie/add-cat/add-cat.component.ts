import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategorieService} from "../../../services/categorie.service";
import {CategorieModel} from "../../../models/categorie.model";
import {ValidDialogComponent} from "../../popup-dialog/valid-dialog/valid-dialog.component";
import { Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../popup-dialog/error-dialog/error-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-cat',
  templateUrl: './add-cat.component.html',
  styleUrl: './add-cat.component.css'
})
export class AddCatComponent implements OnInit{

  catListForm!: FormGroup;
  spinnerProgress: boolean = false;

  constructor(
              private dialog: MatDialog,
              private route: Router,
              private location: Location,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private catService: CategorieService) {}

  ngOnInit(): void {
    this.catListForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
    })

    this.annuler();
  }

  ajoutUser() {
    if (this.catListForm.valid){
      this.spinnerProgress = true;
      let cat: CategorieModel = {
        idCat: null,
        nom: this.catListForm.value.nom,
        description: this.catListForm.value.description,
      };
      this.catService.ajoutCat(cat).subscribe({
        next: value => {
          this.spinnerProgress = false;
            this.snackBar.open('Produit mis à jour avec succès!', 'Fermer', {
            duration: 3000,
            panelClass: ["snackbar"]
             });
          this.route.navigateByUrl("/admin/categorie");
        },
        error: err => {
          // CategorieDuplicateException
          if (err.status === 409) {
            this.dialog.open(ErrorDialogComponent, {
              data: { message: err.error }
            });
            //  EmptyException
          } else if(err.status === 400) {
            this.dialog.open(ErrorDialogComponent, {
              data: { message: err.error }
            });
          }else{
            // console.log(err);
          }
          this.spinnerProgress = false;
        }
      });
    }else {
      this.catListForm.markAllAsTouched();
    }
  }

  retour() {
    this.location.back()
  }

  annuler() {
    this.catListForm = this.fb.group({
      nom: [''],
      description: [''],
    })
  }
}

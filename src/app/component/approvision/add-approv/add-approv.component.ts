import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApprovService} from "../../../services/approv.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {ValidDialogComponent} from "../../popup-dialog/valid-dialog/valid-dialog.component";
import {ErrorDialogComponent} from "../../popup-dialog/error-dialog/error-dialog.component";
import {ApprovisionModel} from "../../../models/approvision.model";
import {ProduitService} from "../../../services/produit.service";
import {ProduitModel} from "../../../models/produit.model";
import {ValidDialogApprovComponent} from "../../popup-dialog/valid-dialog-approv/valid-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import { ProduitDAOModel } from '../../../models/produitDAO.model ';

@Component({
  selector: 'app-add-approv',
  templateUrl: './add-approv.component.html',
  styleUrl: './add-approv.component.css'
})
export class AddApprovComponent implements OnInit{

  approvListForm!: FormGroup;
  spinnerProgress: boolean = false;
  listProd!: ProduitDAOModel[];

  constructor(
              private prodService: ProduitService,
              private dialog: MatDialog,
              private route: Router,
              private location: Location,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private approvService: ApprovService) {
  }

  ngOnInit(): void {
    this.prodService.listProduit()
      .subscribe(
        data =>{
          this.listProd = data;
        },
        error => {
          // console.log(error)
        }
      )

    this.approvListForm = this.fb.group({
      designation: [''],
      prixUnitaire: ['', Validators.required],
      cbm: ['', Validators.required],
      quantite: ['', Validators.required],
      dateAchat: ['', Validators.required],
      dateArriver: ['', Validators.required],
      adresseFrs: ['', Validators.required],
      image: [''],
      description: [''],
      produitsApprov: ['', Validators.required],
    })
  }

  retour() {
    this.location.back()
  }

  ajoutApprov() {
    if (this.approvListForm.valid){
      this.spinnerProgress = true;
      let approv: ApprovisionModel = {
        idApprov: null,
        designation: this.approvListForm.value.designation,
        cbm: this.approvListForm.value.cbm,
        prixUnitaire: this.approvListForm.value.prixUnitaire,
        quantite: this.approvListForm.value.quantite,
        dateAchat: this.approvListForm.value.dateAchat,
        dateArriver: this.approvListForm.value.dateArriver,
        adresseFrs: this.approvListForm.value.adresseFrs,
        image: this.approvListForm.value.image,
        description: this.approvListForm.value.description,
        produitsApprov: this.approvListForm.value.produitsApprov,
      };
      this.approvService.ajoutApprov(approv).subscribe({
        next: value => {
          this.spinnerProgress = false;
          this.snackBar.open('Approvision enregistre avec succès!', 'Fermer', { duration: 3500 });
          this.route.navigateByUrl("/admin/approvision");
        },
        error: err => {
          // ApprovDuplicateException
          if (err.status === 409) {
            this.dialog.open(ErrorDialogComponent, {
              data: { message: err.error }
            });
            //  ApprovNotFoundException
          } else if(err.status === 404) {
            this.dialog.open(ErrorDialogComponent, {
              data: { message: err.error }
            });
            // EmptyException
          }else if(err.status === 400) {
            this.dialog.open(ErrorDialogComponent, {
              data: {message: err.error}
            });
          }else{
            // console.log(err);
          }
          this.spinnerProgress = false;
        }
      });
    }else {
      this.approvListForm.markAllAsTouched();
    }
  }

  annuler() {

    this.approvListForm = this.fb.group({
      designation: [''],
      prixUnitaire: [''],
      cbm: [''],
      quantite: [''],
      dateAchat: [''],
      dateArriver: [''],
      adresseFrs: [''],
      image: [''],
      description: [''],
      produitsApprov: [''],
    })
  }
}

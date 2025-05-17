import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProduitModel} from "../../../models/produit.model";
import {ProduitService} from "../../../services/produit.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApprovService} from "../../../services/approv.service";
import {ApprovisionModel} from "../../../models/approvision.model";
import {CategorieModel} from "../../../models/categorie.model";
import { ErrorDialogComponent } from '../../popup-dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-update-approv',
  templateUrl: './update-approv.component.html',
  styleUrl: './update-approv.component.css'
})
export class UpdateApprovComponent implements OnInit{

  approvListForm!: FormGroup;
  spinnerProgress: boolean = false;
  approvId: string | null = null;

  constructor(
    private dialog: MatDialog,
    private route: Router,
    private router: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private approvService: ApprovService) {
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
      produitsApprov: [],
    })
  }

  ngOnInit(): void {
    this.approvId = this.router.snapshot.paramMap.get('idApprov');
    if (this.approvId) {
      this.approvService.afficher(this.approvId).subscribe(
        (approv: ApprovisionModel) => {
          this.approvListForm.patchValue(approv);
        },
        error => {
          console.error('Erreur lors du chargement de approvison:', error);
        }
      );
    }
  }

  retour() {
    this.location.back()
  }

  modifierApprov() {
    if (this.approvListForm.valid) {
      this.spinnerProgress=true;
      const approv: ApprovisionModel = this.approvListForm.value;
      if (this.approvId) {
        approv.idApprov = this.approvId
        this.approvService.modifierApprov(approv).subscribe(
          () => {
            this.spinnerProgress=false;
            this.snackBar.open('Approvion mis à jour avec succès!', 'Fermer', { duration: 3500 });
            this.route.navigateByUrl('/admin/approvision');
          },
          error => {
            this.spinnerProgress=false;
            this.snackBar.open('Erreur lors de la mise à jour du Approvion.', 'Fermer', { duration: 3000 });
            // ApprovDuplicateException
            if (error.status === 409) {
              this.dialog.open(ErrorDialogComponent, {
                data: { message: error.error }
              });
              //  ApprovNotFoundException
            } else if(error.status === 404) {
              this.dialog.open(ErrorDialogComponent, {
                data: { message: error.error }
              });
              // EmptyException
            }else if(error.status === 400) {
              this.dialog.open(ErrorDialogComponent, {
                data: {message: error.error}
              });
            }else{
              // console.log(error);
            }
            this.spinnerProgress = false;
          }
        );
      }
    }else {
      // console.log("formulaire invalid")
    }
  }
}

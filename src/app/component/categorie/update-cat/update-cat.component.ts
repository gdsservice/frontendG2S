import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategorieService} from "../../../services/categorie.service";
import {StockModel} from "../../../models/stock.model";
import {CategorieModel} from "../../../models/categorie.model";
import {ErrorDialogComponent} from "../../popup-dialog/error-dialog/error-dialog.component";

@Component({
  selector: 'app-update-cat',
  templateUrl: './update-cat.component.html',
  styleUrl: './update-cat.component.css'
})
export class UpdateCatComponent implements OnInit{

  categorieForm!: FormGroup;
  spinnerProgress: boolean = false;
  catId: string | null = null;
  

  constructor(
    private dialog: MatDialog,
    private route: Router,
    private router: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private catService: CategorieService) {
    this.categorieForm = this.fb.group({
      nom: [''],
      description: [''],
      slug: [''],
      publier: ['']
    })
  }


  ngOnInit(): void {
    this.catId = this.router.snapshot.paramMap.get('idCat');
    if (this.catId) {
      this.catService.afficher(this.catId).subscribe(
        (cat: CategorieModel) => {
          this.categorieForm.patchValue(cat);
        },
        error => {
          console.error('Erreur lors du chargement du categorie:', error);
        }
      );
    }
  }

  retour() {
    this.route.navigateByUrl("/admin/categorie");
  }

  modifierCat() {
    if (this.categorieForm.valid) {
      this.spinnerProgress=true;
      const cat: CategorieModel = this.categorieForm.value;
      if (this.catId) {
        cat.idCat = this.catId;
        this.catService.modifierCat(cat).subscribe(
          () => {
            this.spinnerProgress=false;
            this.snackBar.open('Categorie mis à jour avec succès!', 'Fermer', { duration: 3000 });
            this.route.navigateByUrl('/admin/categorie');
          },
          error => {
            this.spinnerProgress=false;
            if (error.status === 409) {
              this.dialog.open(ErrorDialogComponent, {
                data: { message: error.error }
              });
              //  EmptyException
            } else if(error.status === 404) {
              this.dialog.open(ErrorDialogComponent, {
                data: { message: error.error }
              });
            }else if(error.status === 400) {
              this.dialog.open(ErrorDialogComponent, {
                data: {message: error.error}
              });
            }else{
              // console.log(error);
            }
            this.snackBar.open('Erreur lors de la mise à jour du categorie.', 'Fermer', { duration: 3000 });
          }
        );
      }
    }
  }
}

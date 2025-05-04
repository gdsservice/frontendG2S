import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategorieModel } from "../../../models/categorie.model";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { CategorieService } from "../../../services/categorie.service";
import { ProduitService } from "../../../services/produit.service";
import { StockModel } from "../../../models/stock.model";
import { ProduitModel } from "../../../models/produit.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ErrorDialogComponent } from "../../popup-dialog/error-dialog/error-dialog.component";
import { ProduitDAOModel } from '../../../models/produitDAO.model ';
import { ProduitINPUTModel } from '../../../models/produitINPUT.model ';

@Component({
  selector: 'app-update-prod',
  templateUrl: './update-prod.component.html',
  styleUrl: './update-prod.component.css'
})
export class UpdateProdComponent implements OnInit {

  prodListForm!: FormGroup;
  listCategorie!: CategorieModel[];
  spinnerProgress: boolean = false;
  private prodId: string | null = null;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  existingImageUrl: string | null = null;


  constructor(private dialog: MatDialog,
    private route: ActivatedRoute,
    protected router: Router,
    private snackBar: MatSnackBar,
    private location: Location,
    private fb: FormBuilder,
    //  private produitService: ProduitService,
    private catService: CategorieService,
    private prodService: ProduitService) {
    this.prodListForm = this.fb.group({
      designation: [''],
      quantite: [0],
      prixUnitaire: [0],
      imageUrl: [''],
      image: [''],
      note: [''],
      categorieStockProdDTO: [],
    })
  }



  ngOnInit(): void {
    this.prodId = this.route.snapshot.paramMap.get('idProd');
    if (this.prodId) {
      this.prodService.afficher(this.prodId).subscribe(
        (prod: ProduitDAOModel) => {

          const imageUrl = this.prodService.getImageUrl(prod.idProd!);
          this.existingImageUrl = imageUrl;

          this.prodListForm.patchValue({
            ...prod,
            imageUrl: this.existingImageUrl
          });

          console.log(this.prodListForm.value);
        },
        error => {
          console.error('Erreur lors du chargement du produit:', error);
        }
      );
    }



    this.catService.listeCat()
      .subscribe(
        data => {
          this.listCategorie = data;
        },
        error => {
          console.log(error)
        }
      )
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Vérification du type de fichier
      // if (file.type.match('.*')) {
      //   alert('Seules les images sont autorisées');
      //   return;
      // }

      // Vérification de la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La taille maximale est de 5MB');
        return;
      }

      this.selectedFile = file;

      // Création de l'aperçu
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    // Réinitialiser l'input file si nécessaire
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  removeExistingImage(): void {
    this.existingImageUrl = null;
    this.prodListForm.patchValue({ imageUrl: null });
  }


  retour() {
    this.location.back()
  }

  modifierProd() {
    if (this.prodListForm.valid) {
      this.spinnerProgress = true;
      const prod: ProduitINPUTModel = this.prodListForm.value;
      if (this.prodId) {
        prod.idProd = this.prodId;
        this.prodService.modifierProd(prod).subscribe(
          () => {
            this.spinnerProgress = false;
            this.snackBar.open('Produit mis à jour avec succès!', 'Fermer', {
              duration: 3000,
              panelClass: ['custom-snackbar']
            });
            this.router.navigateByUrl('/admin/produit');
          },
          error => {
            if (error.status === 409) {
              this.dialog.open(ErrorDialogComponent, {
                data: { message: error.error }
              });
              //  EmptyException
            } else if (error.status === 404) {
              this.dialog.open(ErrorDialogComponent, {
                data: { message: error.error }
              });
            } else if (error.status === 400) {
              this.dialog.open(ErrorDialogComponent, {
                data: { message: error.error }
              });
            } else {
              console.log(error);
            }
            this.spinnerProgress = false;
            this.snackBar.open('Erreur lors de la mise à jour du produit.', 'Fermer', { duration: 3000 });
          }
        );
      }
    }
  }
}

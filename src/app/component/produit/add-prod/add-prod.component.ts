import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { CategorieService } from "../../../services/categorie.service";
import { CategorieModel } from "../../../models/categorie.model";
import { ErrorDialogComponent } from "../../popup-dialog/error-dialog/error-dialog.component";
import { ProduitService } from "../../../services/produit.service";
import { ProduitModel } from "../../../models/produit.model";
import { ValidDialogProduitComponent } from "../../popup-dialog/valid-dialog-produit/valid-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProduitINPUTModel } from '../../../models/produitINPUT.model ';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrl: './add-prod.component.css'
})
export class AddProdComponent implements OnInit {

  prodListForm!: FormGroup;
  listCategorie!: CategorieModel[];
  spinnerProgress: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;


  constructor(private dialog: MatDialog,
    private route: Router,
    protected router: Router,
    private snackBar: MatSnackBar,
    private location: Location,
    private fb: FormBuilder,
    private catService: CategorieService,
    private prodService: ProduitService) {
  }



  ngOnInit(): void {

    this.catService.listeCat()
      .subscribe(
        data => {
          this.listCategorie = data;
        },
        error => {
          // console.log(error)
        }
      )

    this.prodListForm = this.fb.group({
      designation: ['', Validators.required],
      quantite: ['', Validators.required],
      prixUnitaire: ['', Validators.required],
      prixRegulier: ['', Validators.required],
      cat: ['', Validators.required],
      plusVendu: [false],
      offreSpeciale: [false],
      vedette: [false],
      publier: [true],
      image: ['', Validators.required],
      description: [''],
      note: [''],

    })

    this.annulerProd();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Vérification du type de fichier (seulement PNG et JPEG/JPG)
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        this.snackBar.open('Seules les images PNG, JPG et JPEG sont autorisées', 'Fermer', { duration: 3000 });
        return;
      }

      if (file.tyle == '') {
        this.snackBar.open('Impossible d\'importer. Utilisez une image dans l\'un de ces formats : .jpg, .png, ou .jpeg', 'Fermer', { duration: 4000 });
        return;
      }

      // Vérification de la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.snackBar.open('La taille maximale est de 5MB', 'Fermer', { duration: 3000 });
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


  retour() {
    this.location.back()
  }

  ajoutProd() {
    if (this.prodListForm.valid) {
      this.spinnerProgress = true;

      const produit: ProduitINPUTModel = {
        idProd: null,
        designation: this.prodListForm.value.designation,
        quantite: this.prodListForm.value.quantite,
        prixUnitaire: this.prodListForm.value.prixUnitaire,
        prixRegulier: this.prodListForm.value.prixRegulier,
        nouveaute: true,
        offreSpeciale: this.prodListForm.value.offreSpeciale,
        vedette: this.prodListForm.value.vedette,
        plusVendu: this.prodListForm.value.plusVendu,
        publier: this.prodListForm.value.publier,
        description: this.prodListForm.value.description,
        note: this.prodListForm.value.note,
        categorieStockProdDTO: this.prodListForm.value.cat,
        image: null
      };

      const formData = new FormData();
      formData.append('produit', JSON.stringify(produit));
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.prodService.ajoutProd(formData).subscribe({
        next: value => {
          this.spinnerProgress = false;
          this.snackBar.open('Produit ajouté avec succès!', 'Fermer', { duration: 3000 });
          this.router.navigateByUrl('/admin/produit');
        },
        error: (err) => {
          // ClientDuplicateException
          if (err.status === 409) {
            this.dialog.open(ErrorDialogComponent, {
              data: { message: err.error }
            });
            //  ClientNotFoundException
          } else if (err.status === 404) {
            this.dialog.open(ErrorDialogComponent, {
              data: { message: err.error }
            });
            // EmailIncorrectException && EmptyException
          } else if (err.status === 400) {
            this.dialog.open(ErrorDialogComponent, {
              data: { message: err.error }
            });
          } else {
            // console.log(err);
          }
          this.spinnerProgress = false;
        },
      });
    } else {
      this.prodListForm.markAllAsTouched();
    }
  }


  annulerProd() {
    this.prodListForm = this.fb.group({
      designation: ['', Validators.required],
      quantite: ['', Validators.required],
      prixUnitaire: ['', Validators.required],
      prixRegulier: ['', Validators.required],
      cat: ['', Validators.required],
      plusVendu: [false],
      offreSpeciale: [false],
      vedette: [false],
      publier: [true],
      image: ['', Validators.required],
      description: [''],
      note: [''],
    })

  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { CategorieService } from "../../../services/categorie.service";
import { CategorieModel } from "../../../models/categorie.model";
import { ErrorDialogComponent } from "../../popup-dialog/error-dialog/error-dialog.component";
import { ProduitService } from "../../../services/produit.service";
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
  selectedFiles: File[] = [];
  imagePreviews: (string | ArrayBuffer)[] = []; 


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
      designation: [''],
      quantite: [''],
      prixUnitaire: [''],
      prixRegulier: [''],
      cat: [''],
      nouveaute:[true],
      plusVendu: [false],
      offreSpeciale: [false],
      vedette: [false],
      publier: [true],
      image: [''],
      description: [''],
      note: [''],
      slug: [''],

    })

    this.annulerProd();
  }

   onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Vérification du nombre d'images (max 5 par exemple)
      if (this.selectedFiles.length + files.length > 5) {
        this.snackBar.open('Maximum 5 images autorisées', 'Fermer', { duration: 3000 });
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Vérification du type de fichier
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
          this.snackBar.open('Seules les images PNG, JPG et JPEG sont autorisées', 'Fermer', { duration: 3000 });
          continue;
        }

        // Vérification de la taille (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          this.snackBar.open(`L'image ${file.name} dépasse 5MB`, 'Fermer', { duration: 3000 });
          continue;
        }

        this.selectedFiles.push(file);

        // Création de l'aperçu
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviews.push(e.target?.result as string | ArrayBuffer);
        };
        reader.readAsDataURL(file);
      }
    }
  }

   removeImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
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
        nouveaute:this.prodListForm.value.nouveaute,
        offreSpeciale: this.prodListForm.value.offreSpeciale,
        vedette: this.prodListForm.value.vedette,
        plusVendu: this.prodListForm.value.plusVendu,
        publier: this.prodListForm.value.publier,
        description: this.prodListForm.value.description,
        note: this.prodListForm.value.note,
        slug: this.prodListForm.value.slug,
        categorieStockProdDTO: this.prodListForm.value.cat,
        images: this.selectedFiles,
      };

      const formData = new FormData();
      formData.append('produit', JSON.stringify(produit));

         // Ajoutez chaque image
    this.selectedFiles.forEach(file => {
      formData.append('images', file, file.name);
    });

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
      designation: [''],
      quantite: [''],
      prixUnitaire: [''],
      prixRegulier: [''],
      cat: [''],
      plusVendu: [false],
      nouveaute: [true],
      offreSpeciale: [false],
      vedette: [false],
      publier: [true],
      image: [''],
      description: [''],
      note: [''],
      slug: [''],
    })

  }

}

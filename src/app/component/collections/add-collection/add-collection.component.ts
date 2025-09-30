import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProduitDAOModel } from '../../../models/produitDAO.model ';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollectionService } from '../../../services/collection.service';
import { ProduitService } from '../../../services/produit.service';
import { Location } from '@angular/common';
import { CollectionINPUT } from '../../../models/collection-input';
import { ErrorDialogComponent } from '../../popup-dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrl: './add-collection.component.css'
})
export class AddCollectionComponent {

  collectionListForm!: FormGroup;
    spinnerProgress: boolean = false;
    selectedFiles: File[] = [];
    imagePreviews: (string | ArrayBuffer)[] = [];
    listProduit!: ProduitDAOModel[];
  
    constructor(
      private dialog: MatDialog,
      private route: Router,
      private snackBar: MatSnackBar,
      private fb: FormBuilder,
      private collectionService: CollectionService,
      private prodService: ProduitService,
      private location: Location,
    ) { }
  
    ngOnInit(): void {
  
      this.prodService.listProduit()
        .subscribe(
          data => {
            this.listProduit = data;
          },
          error => {
            // console.log(error)
          }
        )
  
      this.collectionListForm = this.fb.group({
        idCollection: null,
        sous_titre: [''],
        titre: [''],
        btn_text: [''],
        btn_link: [''],
        publier: true,
        images: ['']
      })
    }
  
    onFileSelected(event: any): void {
      const files = event.target.files;
      if (files && files.length > 0) {
        // Vérification du nombre d'images (max 5 par exemple)
        if (this.selectedFiles.length + files.length > 2) {
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
  
    addCollection() {
      if (this.collectionListForm.valid) {
        // Vérification de la catégorie sélectionnée  
        this.spinnerProgress = true;
        const collections: CollectionINPUT = {
          idCollection: null,
          sous_titre: this.collectionListForm.value.sous_titre,
          titre: this.collectionListForm.value.titre,
          btn_text: this.collectionListForm.value.btn_text,
          btn_link: this.collectionListForm.value.btn_link,
          publier: true,
          images: this.selectedFiles,
        };
  
        const formData = new FormData();
        formData.append('collections', JSON.stringify(collections));
  
        // Ajoutez chaque image
        this.selectedFiles.forEach(file => {
          formData.append('images', file, file.name);
        });
  
        this.collectionService.addCollection(formData).subscribe({
          next: value => {
            this.spinnerProgress = false;
            this.snackBar.open('Collection ajouté avec succès!', 'Fermer', { duration: 3000 });
            this.route.navigateByUrl('/admin/collection');
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
        }
        );
      } else {
        this.collectionListForm.markAllAsTouched();
      }
    }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProduitDAOModel } from '../../../models/produitDAO.model ';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollectionService } from '../../../services/collection.service';
import { ProduitService } from '../../../services/produit.service';
import { CollectionDAO } from '../../../models/collection-dao';
import { Location } from '@angular/common';
import { CollectionINPUT } from '../../../models/collection-input';
import { ErrorDialogComponent } from '../../popup-dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-update-collection',
  templateUrl: './update-collection.component.html',
  styleUrl: './update-collection.component.css'
})
export class UpdateCollectionComponent {
  collectionListForm!: FormGroup;
  spinnerProgress = false;
  collectionId: string | null = null;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  existingImageUrl: string | null = null;
  listProduit!: ProduitDAOModel[];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private collectionService: CollectionService,
    private prodService: ProduitService,
    private location: Location,
  ) {
    this.collectionListForm = this.fb.group({
      idCollection: null,
      sous_titre: [''],
      titre: [''],
      btn_text: [''],
      btn_link: [''],
      publier: [],
      images: ['']
    })
  }

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

    this.collectionId = this.route.snapshot.paramMap.get('idCollection');
    if (this.collectionId) {
      this.loadCollection(this.collectionId);
    }
  }

    compareProd(c1: any, c2: any): boolean {
  return c1 && c2 ? c1.nom === c2.nom : c1 === c2;
}

  loadCollection(id: string): void {
    this.collectionService.afficher(id).subscribe({

      next: (collection: CollectionDAO) => {

        this.existingImageUrl = this.collectionService.getImageUrl(collection.idCollection!);

        this.collectionListForm.patchValue({
          idCollection: null,
          titre: collection.titre,
          sous_titre: collection.sous_titre,
          btn_text: collection.btn_text,
          btn_link: collection.btn_link,
          publier: collection.publier,
          imageUrl: this.existingImageUrl,
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement du banner:', err);
        this.snackBar.open('Erreur lors du chargement du collection', 'Fermer', { duration: 3000 });
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    // Validation du type de fichier
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      this.snackBar.open('Seules les images PNG, JPG et JPEG sont autorisées', 'Fermer', { duration: 3000 });
      return;
    }

    // Validation de la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.snackBar.open('La taille maximale est de 5MB', 'Fermer', { duration: 3000 });
      return;
    }

    this.selectedFile = file;

    // Création de l'aperçu
    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result;
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  removeExistingImage(): void {
    this.existingImageUrl = null;
    this.collectionListForm.patchValue({ image: null });
  }

  retour(): void {
    this.location.back();
  }

  modifierCollection(): void {
    if (this.collectionListForm.invalid || !this.collectionId) {
      this.collectionListForm.markAllAsTouched();
      return;
    }

    this.spinnerProgress = true;
    const collection: CollectionINPUT = {
      ...this.collectionListForm.value,
      idCollection: this.collectionId
    };

    const formData = new FormData();
    formData.append('collections', JSON.stringify(collection));
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.collectionService.modifierCollectionAvecImage(formData, this.collectionId).subscribe({
      next: () => {
        this.snackBar.open('Collection mis à jour avec succès!', 'Fermer', { duration: 3000 });
        this.router.navigate(['/admin/collection']);
      },
      error: (err) => {
        this.spinnerProgress = false;
        let errorMessage = 'Erreur lors de la mise à jour du banner';

        if (err.status === 409 || err.status === 404 || err.status === 400) {
          errorMessage = err.error;
        }

        this.dialog.open(ErrorDialogComponent, {
          data: { message: errorMessage }
        });
      }
    });
  }

  annulerCollection() {
    this.router.navigate(['/admin/collection']);
  }

}

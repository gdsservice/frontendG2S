import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from '../../../services/banner.service';
import { BannerDAO } from '../../../models/banner-dao';
import { ErrorDialogComponent } from '../../popup-dialog/error-dialog/error-dialog.component';
import { BannerINPUT } from '../../../models/banner-input';
import { ProduitService } from '../../../services/produit.service';
import { ProduitDAOModel } from '../../../models/produitDAO.model ';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-banner',
  templateUrl: './update-banner.component.html',
  styleUrl: './update-banner.component.css'
})
export class UpdateBannerComponent {

  bannerListForm: FormGroup;
  spinnerProgress = false;
  bannerId: string | null = null;
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
    private bannerService: BannerService,
    private prodService: ProduitService,
    private location: Location,
  ) {
    this.bannerListForm = this.fb.group({
      idBanner: null,
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

    this.bannerId = this.route.snapshot.paramMap.get('idBanner');
    if (this.bannerId) {
      this.loadBanner(this.bannerId);
    }
  }

    compareProd(c1: any, c2: any): boolean {
  return c1 && c2 ? c1.nom === c2.nom : c1 === c2;
}

  loadBanner(id: string): void {
    this.bannerService.afficher(id).subscribe({

      next: (banner: BannerDAO) => {

        this.existingImageUrl = this.bannerService.getImageUrl(banner.idBanner!);

        this.bannerListForm.patchValue({
          idBanner: null,
          titre: banner.titre,
          sous_titre: banner.sous_titre,
          btn_text: banner.btn_text,
          btn_link: banner.btn_link,
          publier: banner.publier,
          imageUrl: this.existingImageUrl,
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement du banner:', err);
        this.snackBar.open('Erreur lors du chargement du banner', 'Fermer', { duration: 3000 });
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
    this.bannerListForm.patchValue({ image: null });
  }

  retour(): void {
    this.location.back();
  }

  modifierBanner(): void {
    if (this.bannerListForm.invalid || !this.bannerId) {
      this.bannerListForm.markAllAsTouched();
      return;
    }

    this.spinnerProgress = true;
    const banner: BannerINPUT = {
      ...this.bannerListForm.value,
      idBanner: this.bannerId
    };

    const formData = new FormData();
    formData.append('banner', JSON.stringify(banner));
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.bannerService.modifierBannerAvecImage(formData, this.bannerId).subscribe({
      next: () => {
        this.snackBar.open('Banner mis à jour avec succès!', 'Fermer', { duration: 3000 });
        this.router.navigate(['/admin/banner']);
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

  annulerBanner() {
    this.router.navigate(['/admin/banner']);
  }

}

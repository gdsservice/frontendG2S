import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BannerService } from '../../../services/banner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BannerINPUT } from '../../../models/banner-input';
import { ErrorDialogComponent } from '../../popup-dialog/error-dialog/error-dialog.component';
import { ProduitDAOModel } from '../../../models/produitDAO.model ';
import { ProduitService } from '../../../services/produit.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrl: './add-banner.component.css'
})
export class AddBannerComponent {

  bannerListForm!: FormGroup;
  spinnerProgress: boolean = false;
  selectedFiles: File[] = [];
  imagePreviews: (string | ArrayBuffer)[] = [];
  listProduit!: ProduitDAOModel[];

  constructor(
    private dialog: MatDialog,
    private route: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private bannerService: BannerService,
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

    this.bannerListForm = this.fb.group({
      idBanner: null,
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

  addBanner() {
    if (this.bannerListForm.valid) {
      // Vérification de la catégorie sélectionnée  
      this.spinnerProgress = true;
      const banner: BannerINPUT = {
        idBanner: null,
        sous_titre: this.bannerListForm.value.sous_titre,
        titre: this.bannerListForm.value.titre,
        btn_text: this.bannerListForm.value.btn_text,
        btn_link: this.bannerListForm.value.btn_link,
        publier: true,
        images: this.selectedFiles,
      };

      const formData = new FormData();
      formData.append('banner', JSON.stringify(banner));

      // Ajoutez chaque image
      this.selectedFiles.forEach(file => {
        formData.append('images', file, file.name);
      });

      this.bannerService.addBanner(formData).subscribe({
        next: value => {
          this.spinnerProgress = false;
          this.snackBar.open('Banner ajouté avec succès!', 'Fermer', { duration: 3000 });
          this.route.navigateByUrl('/admin/banner');
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
      this.bannerListForm.markAllAsTouched();
    }
  }

}

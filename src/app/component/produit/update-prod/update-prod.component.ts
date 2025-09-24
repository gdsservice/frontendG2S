import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategorieModel } from "../../../models/categorie.model";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { CategorieService } from "../../../services/categorie.service";
import { ProduitService } from "../../../services/produit.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ErrorDialogComponent } from "../../popup-dialog/error-dialog/error-dialog.component";
import { ProduitDAOModel } from '../../../models/produitDAO.model ';
import { ProduitINPUTModel } from '../../../models/produitINPUT.model ';

@Component({
  selector: 'app-update-prod',
  templateUrl: './update-prod.component.html',
  styleUrls: ['./update-prod.component.css']
})
export class UpdateProdComponent implements OnInit {
  prodListForm: FormGroup;
  listCategorie: CategorieModel[] = [];
  spinnerProgress = false;
  prodId: string | null = null;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  existingImageUrl: string[] | null = null;
  catExist: any | null = null;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location,
    private fb: FormBuilder,
    private catService: CategorieService,
    private prodService: ProduitService,
  ) {
    this.prodListForm = this.fb.group({
      designation: ['', Validators.required],
      slug: ['', Validators.required],
      quantite: [0, [Validators.required, Validators.min(1)]],
      prixUnitaire: [0, [Validators.required, Validators.min(1)]],
      prixRegulier: [0, [Validators.required, Validators.min(1)]],
      categorieStockProdDTO: [''],
      description: [''],
      note: [''],
      publier: [],
      nouveaute: [],
      plusVendu: [],
      offreSpeciale: [],
      vedette: [],
      image: [null],
      caracteristique: [''],
      info: ['']
    });
  }

  quillConfig = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['emoji'],
      ['clean']
    ],
    mention: {
      mentionDenotationChars: ['@', '#'],
      source: (searchTerm: string, renderList: any) => {
        const values = [
          { id: 1, value: 'Produit A' },
          { id: 2, value: 'Produit B' },
          { id: 3, value: 'Categorie X' }
        ];
        const matches = values.filter(entry =>
          entry.value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderList(matches, searchTerm);
      }
    },
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,
  },
  placeholder: 'Saisissez votre texte...',
  theme: 'snow'
};

  ngOnInit(): void {
    this.prodId = this.route.snapshot.paramMap.get('idProd');
    if (this.prodId) {
      this.loadProduct(this.prodId);
    }
    this.loadCategories();
  }

  loadProduct(id: string): void {
    this.prodService.afficher(id).subscribe({
      
      next: (prod: ProduitDAOModel) => {
        
        this.existingImageUrl = this.prodService.getImageUrls(prod.idProd!,5);
        
        this.prodListForm.patchValue({
          designation: prod.designation,
          slug: prod.slug,
          quantite: prod.quantite,
          prixUnitaire: prod.prixUnitaire,
          prixRegulier: prod.prixRegulier,
          categorieStockProdDTO: prod.categorieStockProdDTO,
          description: prod.description,
          note: prod.note,
          publier: prod.publier,
          nouveaute: prod.nouveaute,
          plusVendu: prod.plusVendu,
          offreSpeciale: prod.offreSpeciale,
          vedette: prod.vedette,
          caracteristique: prod.caracteristique,
          info: prod.info
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement du produit:', err);
        this.snackBar.open('Erreur lors du chargement du produit', 'Fermer', { duration: 3000 });
      }
    });
  }

  loadCategories(): void {
    this.catService.listeCat().subscribe({
      next: (data) => this.listCategorie = data,
      error: (err) => {
        console.error('Erreur lors du chargement des catégories:', err);
        this.snackBar.open('Erreur lors du chargement des catégories', 'Fermer', { duration: 3000 });
      }
    });
  }
// test
  compareCategorie(c1: any, c2: any): boolean {
  return c1 && c2 ? c1.nom === c2.nom : c1 === c2;
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
    this.prodListForm.patchValue({ image: null });
  }

  retour(): void {
    this.location.back();
  }

  modifierProd(): void {
    if (this.prodListForm.invalid || !this.prodId) {
      this.prodListForm.markAllAsTouched();
      return;
    }

    this.spinnerProgress = true;
    const produit: ProduitINPUTModel = {
      ...this.prodListForm.value,
      idProd: this.prodId
    };

    const formData = new FormData();
    formData.append('produit', JSON.stringify(produit));
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.prodService.modifierProdAvecImage(formData, this.prodId).subscribe({
      next: () => {
        this.snackBar.open('Produit mis à jour avec succès!', 'Fermer', { duration: 3000 });
        this.router.navigate(['/admin/produit']);
      },
      error: (err) => {
        this.spinnerProgress = false;
        let errorMessage = 'Erreur lors de la mise à jour du produit';
        
        if (err.status === 409 || err.status === 404 || err.status === 400) {
          errorMessage = err.error;
        }

        this.dialog.open(ErrorDialogComponent, {
          data: { message: errorMessage }
        });
      }
    });
  }

  annulerProd() {
    this.router.navigate(['/admin/produit']);

  }
}
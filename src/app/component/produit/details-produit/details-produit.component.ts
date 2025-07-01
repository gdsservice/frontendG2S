import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../../../services/produit.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ProduitDAOModel } from '../../../models/produitDAO.model ';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.css']
})
export class DetailsProduitComponent implements OnInit {
  produit: ProduitDAOModel | null = null;
  isLoading = true;
  produitId: string | null = null;
  existingImageUrl: string[] | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService,
    private snackBar: MatSnackBar,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.produitId = this.route.snapshot.paramMap.get('idProd');
    if (this.produitId) {
      this.loadProduitDetails(this.produitId);
    } else {
      this.snackBar.open('ID du produit non trouvé', 'Fermer', { duration: 3000 });
      this.router.navigate(['/produit']);
    }
  }

  loadProduitDetails(idProd: string): void {
    this.isLoading = true;
    this.produitService.afficher(idProd).subscribe({
      next: (produit) => {
        this.existingImageUrl = this.produitService.getImageUrls(produit.idProd!,5);
        this.produit = produit;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du produit:', err);
        this.snackBar.open('Erreur lors du chargement du produit', 'Fermer', { duration: 3000 });
        this.isLoading = false;
        this.router.navigate(['/produit']);
      }
    });
  }

  retour(): void {
    this.location.back();
  }

  imprimerDetails(): void {
    window.print();
  }
}
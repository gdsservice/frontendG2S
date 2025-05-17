import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { VenteService } from "../../../services/vente.service";
import { VenteModel } from "../../../models/vente.model";
import { ErrorDialogComponent } from "../../popup-dialog/error-dialog/error-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { VenteDAOModel } from '../../../models/venteDAO.model';
import { VenteInputModel } from '../../../models/venteInput.model ';
import { ProduitModel } from '../../../models/produit.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VenteProduitModel } from '../../../models/venteProduit.model';
import { MatTableDataSource } from '@angular/material/table';
import { ProduitDAOModel } from '../../../models/produitDAO.model ';
import { ClientModel } from '../../../models/client.model';
import { ProduitService } from '../../../services/produit.service';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-update-vente',
  templateUrl: './update-vente.component.html',
  styleUrl: './update-vente.component.css'
})
export class UpdateVenteComponent implements OnInit {

  venteListForm!: FormGroup;
  spinnerProgress: boolean = false;
  venteId: string | null = null;
  quantiteProd: any;
  filteredProd: ProduitModel[] = [];
  produitsSelectionnes: VenteProduitModel[] = [];
  listProd!: ProduitDAOModel[];
  listClient!: ClientModel[];
  dataSource = new MatTableDataSource(this.produitsSelectionnes);
  displayedColumns = ['designation', 'quantite', "prixUnitaire", 'reduction', 'montant', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: Router,
    private location: Location,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private venteService: VenteService,
    private prodService: ProduitService,
    private clientService: ClientService,
    private router: ActivatedRoute) {
    this.venteListForm = this.fb.group({
      description: [''],
      montant: [''],
      reduction: [''],
      quantite: ['', Validators.required],
      note: [''],
      clientDTO: [],
      produitsVend: [],
    })
  }

  ngOnInit(): void {

    // Initialisation des produits et clients
    this.prodService.listProduit()
      .subscribe(data => {
        this.listProd = data;
      }, error => {
        // console.log(error);
      });

    this.clientService.listClient()
      .subscribe(data => {
        this.listClient = data;
      }, error => {
        // console.log(error);
      });

    // Initialisation du formulaire
    this.venteListForm = this.fb.group({
      reduction: [''],
      quantite: ['', Validators.required],
      note: [''],
      produitsVend: [[], Validators.required],
      clientInput: [''],
      // Ajoute les contrôles pour le nouveau client
      nom: [''],
      prenom: [''],
      adresse: [''],
      telephone: ['', Validators.required],
      email: [''],
    });

    this.venteId = this.router.snapshot.paramMap.get('idVente');
    // console.log(this.venteId);
    if (this.venteId) {
      this.venteService.afficher(this.venteId).subscribe(
        (venteProduit: VenteDAOModel) => {
          // console.log(venteProduit);
          const vente = venteProduit.vente;
          this.venteListForm.patchValue({
            montant: vente.montant,
            reduction: vente.reduction,
            quantite: vente.quantite,
            note: vente.note,
          });
        },
        error => {
          console.error('Erreur lors du chargement du vente:', error);
        }
      );
    }
  }

  formatTelephone(event: any) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 8) {
      input = input.substring(0, 8);
    }
    if (input.length > 0) {
      input = input.match(/.{1,2}/g)?.join('-') || input;
    }
    this.venteListForm.get('telephone')?.setValue(input, { emitEvent: false });
  }

  supprimer(index: any) {
    // Suppression du produit sélectionné de la liste
    this.produitsSelectionnes.splice(index, 1);
    this.dataSource.data = this.produitsSelectionnes;

    // Mettre à jour le formulaire après la suppression
    this.venteListForm.patchValue({
      produitsVend: this.produitsSelectionnes
    });
  }

  calculMontant(produitVente: VenteProduitModel) {

    let index = this.produitsSelectionnes.findIndex(el => el.produit.idProd == produitVente.produit.idProd)
    if (index != -1) {
      produitVente.montant = produitVente.quantite * produitVente.produit.prixUnitaire;
      this.produitsSelectionnes[index] = produitVente;
    }
  }

  onSelectProduit(prod: ProduitModel) {
    // Vérifier si le produit est déjà sélectionné
    const produitExiste = this.produitsSelectionnes.some(produitVente => produitVente.produit.idProd === prod.idProd);

    if (produitExiste) {
      // Afficher un message ou notifier l'utilisateur que le produit est déjà sélectionné
      this.snackBar.open("Le produit " + prod.designation + " est déjà sélectionné.", 'Fermer', { duration: 3500 });
      return;
    }

    // Ajoutez le produit avec une quantité et un prix unitaire par défaut
    /*  let produitAjoute = {
       ...prod,
        quantite: prod.quantite,
       prixUnitaire: prod.prixUnitaire, 
     }; */

    let produitAjoute: VenteProduitModel = {
      produit: prod,
      montant: 0,
      quantite: 0,
      reduction: 0,
    };

    // Ajouter le produit à la liste des produits sélectionnés
    this.produitsSelectionnes.push(produitAjoute)

    // Mettre à jour la dataSource du tableau avec les produits sélectionnés
    // this.dataSource.data = this.produitsSelectionnes;
    this.dataSource = new MatTableDataSource(this.produitsSelectionnes);
    // Mettre à jour les produits sélectionnés dans le formulaire
    this.venteListForm.patchValue({
      produitsVend: this.produitsSelectionnes,
      quantite: this.quantiteProd
    });

  }

  annuler() {
    this.venteListForm = this.fb.group({
      description: [''],
      reduction: [''],
      quantite: [''],
      note: [''],
      produitsVend: [[]],
      clientInput: [''],
    });
  }

  // Méthode pour filtrer les produits en fonction de la recherche
  onSearchChange(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProd = this.listProd.filter((prod) =>
      prod.designation.toLowerCase().includes(searchValue)
    );

  }

  modifierVente() {
    if (this.venteListForm.valid) {
      this.spinnerProgress = true;
      const venteProduit: VenteInputModel = this.venteListForm.value;
      if (this.venteId) {
        venteProduit.vente!.idVente! = this.venteId;
        this.venteService.modifierVente(venteProduit).subscribe(
          () => {
            this.spinnerProgress = false;
            this.snackBar.open('Vente mis à jour avec succès!', 'Fermer', { duration: 3000 });
            this.route.navigateByUrl('/admin/vente');
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
            this.snackBar.open('Erreur lors de la mise à jour du vente.', 'Fermer', { duration: 3000 });
          }
        );
      }
    }
  }

  retour() {
    this.location.back()
  }
}

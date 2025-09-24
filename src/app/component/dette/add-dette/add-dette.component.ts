import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {ProduitService} from "../../../services/produit.service";
import {ClientService} from "../../../services/client.service";
import {DetteService} from "../../../services/dette.service";
import {ProduitModel} from "../../../models/produit.model";
import {ClientModel} from "../../../models/client.model";
import {ErrorDialogComponent} from "../../popup-dialog/error-dialog/error-dialog.component";
import {DetteModel} from "../../../models/dette.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import { ProduitDAOModel } from '../../../models/produitDAO.model ';

@Component({
  selector: 'app-add-dette',
  templateUrl: './add-dette.component.html',
  styleUrl: './add-dette.component.css'
})
export class AddDetteComponent implements OnInit{

  detteListForm!: FormGroup;
  listProd!: ProduitDAOModel[];
  listClient!: ClientModel[];
  produitsSelectionnes: any[] = [];
  spinnerProgress: boolean = false;

  public dataSource: any;
  displayedColumns = ['designation','quantite',"prixUnitaire",'reduction','montant','action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
              private route: Router,
              private location: Location,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private detteService: DetteService,
              private prodService: ProduitService,
              private clientService: ClientService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.prodService.listProduit()
      .subscribe(
        data =>{
          this.listProd = data;
        },
        error => {
          // console.log(error)
        }
      )

    this.clientService.listClient()
      .subscribe(
        data=>{
          this.listClient = data;
        },
        error => {
          // console.log(error)
        }
      )

    this.detteListForm = this.fb.group({
      titre: ['', Validators.required],
      quantite: ['', Validators.required],
      reduction: [''],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      note: [''],
      produitDTOS: [[], Validators.required],
      clientDTO: ['', Validators.required],

    })

    // Configuration du paginator et du sort
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSelectProduit(prod: any) {
    // Vérifier si le produit est déjà sélectionné
    const produitExiste = this.produitsSelectionnes.some(produit => produit.idProd === prod.idProd);

    if (produitExiste) {
      this.snackBar.open("Le produit "  + prod.designation + " est déjà sélectionné.", 'Fermer', { duration: 3500 });
      return;
    }

    // Ajoutez le produit avec une quantité et un prix unitaire par défaut
    let produitAjoute = {
      ...prod,
      quantite: prod.quantite,
      prixUnitaire: prod.prixUnitaire,
    };

    // Ajouter le produit à la liste des produits sélectionnés
    this.produitsSelectionnes.push(produitAjoute);

    // Mettre à jour la dataSource du tableau avec les produits sélectionnés
    this.dataSource.data = this.produitsSelectionnes;

    // Mettre à jour les produits sélectionnés dans le formulaire
    this.detteListForm.patchValue({
      produitDTOS: this.produitsSelectionnes
    });
  }

  retour() {
    this.route.navigateByUrl("/admin/dette");
  }

  ajoutDette() {
    if (this.detteListForm.valid) {
      this.spinnerProgress = true;
      let dette: DetteModel = {
        idDette: null,
        titre: this.detteListForm.value.titre,
        quantite: this.detteListForm.value.quantite,
        reduction: this.detteListForm.value.reduction,
        dateDebut: this.detteListForm.value.dateDebut,
        dateFin: this.detteListForm.value.dateFin,
        note: this.detteListForm.value.note,
        produitDTOS: this.detteListForm.value.produitDTOS,
        clientDTO: this.detteListForm.value.clientDTO,
      };
      // console.log(dette)
      this.detteService.ajoutDette(dette).subscribe({
        next: value => {
          this.spinnerProgress = false;
          this.snackBar.open('Dette enregistre avec succès!', 'Fermer', { duration: 3500 });
          this.route.navigateByUrl("/admin/dette");
        },
        error: err => {
          if (err.status === 409) {
            this.dialog.open(ErrorDialogComponent, {
              data: { message: err.error }
            });
            //  EmptyException
          } else if(err.status === 404) {
            this.dialog.open(ErrorDialogComponent, {
              data: { message: err.error }
            });
            // MontantQuantiteNullException
          }else if(err.status === 400) {
            this.dialog.open(ErrorDialogComponent, {
              data: {message: err.error}
            });
          }else{
            // console.log(err);
          }
          this.spinnerProgress = false;
        }
      });
    } else {
      this.detteListForm.markAllAsTouched();
    }
  }

  supprimer(idProd: any) {
    // Suppression du produit sélectionné de la liste
    this.produitsSelectionnes.splice(idProd, 1);
    this.dataSource.data = this.produitsSelectionnes;

    // Mettre à jour le formulaire après la suppression
    this.detteListForm.patchValue({
      produitDTOS: this.produitsSelectionnes
    });
  }

  annuler() {
    this.detteListForm = this.fb.group({
      titre: [''],
      quantite: [''],
      reduction: [''],
      dateDebut: [''],
      dateFin: [''],
      note: [''],
      produitDTOS: [[]],
      clientDTO: [''],

    })
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ProduitService} from "../../services/produit.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {ErrorDialogComponent} from "../popup-dialog/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  ConfirmationDialogSuppProdComponent
} from "../popup-dialog/confirmation-dialog-supp-prod/confirmation-dialog-supp-prod.component";
import { ProduitDAOModel } from '../../models/produitDAO.model ';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css',
  providers: [DatePipe],
})
export class ProduitComponent implements OnInit{

  public listProduits!: Array<ProduitDAOModel> ;
  public dataSource: any;
  public displayedColumns = ['designation', 'quantite', 'prixUnitaire','prixRegulier', 'montant', 'date', 'cat','utilisateurProd','nouveaute','offreSpeciale','vedette','image','action']
  spinnerProgress: boolean = false;
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  constructor(private datePipe: DatePipe,
              private produitService: ProduitService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.produitService.listProduit()
      .subscribe(
        data => {
          this.listProduits = data.map(produit => ({
            ...produit,
            imageUrl: this.produitService.getImageUrl(produit.idProd!)
          }));
          
          this.dataSource = new MatTableDataSource(this.listProduits);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        },
        error => {
          console.error('Erreur lors du chargement des produits', error);
          this.isLoading = false;
        }
      );
  }


  categorie() {
    this.router.navigateByUrl("/admin/categorie")
  }

  ajouterProd() {
    this.router.navigateByUrl("/admin/addProd")
  }

  // Méthode pour formater la date
  formatDate(date: Date): string {
    return <string>this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  modifier(idProd: string) {
    this.router.navigateByUrl(`/admin/updateProd/${idProd}`)
  }

  supprimer(idProd: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogSuppProdComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinnerProgress = true;
        this.produitService.supprimerProod(idProd).subscribe(
          response => {
            this.spinnerProgress = false;
            this.ngOnInit();
            this.snackBar.open('Produit a ete supprimer avec succès!', 'Fermer', { duration: 3500 });
            this.router.navigateByUrl("/admin/produit");
          },
          error => {
            if (error.status === 409) {
              this.dialog.open(ErrorDialogComponent, {
                data: { message: error.error }
              });
              //  EmptyException
            } else if(error.status === 404) {
              this.dialog.open(ErrorDialogComponent, {
                data: { message: error.error }
              });
              // MontantQuantiteNullException
            }else if(error.status === 400) {
              this.dialog.open(ErrorDialogComponent, {
                data: {message: error.error}
              });
            }else{
              // console.log(error);
            }
            this.spinnerProgress = false;
          }
        );
      }
    });

  }

  details() {

  }

  // Méthode pour appliquer le filtre
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

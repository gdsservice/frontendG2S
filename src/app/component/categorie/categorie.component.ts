import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DatePipe, Location} from '@angular/common';
import {Router} from "@angular/router";
import {CategorieService} from "../../services/categorie.service";
import {UserModel} from "../../models/user.model";
import {CategorieModel} from "../../models/categorie.model";
import {MatTableDataSource} from "@angular/material/table";
import {
  ConfirmationDialogSuppApprovComponent
} from "../popup-dialog/confirmation-dialog-supp-approv/confirmation-dialog-supp-approv.component";
import {ErrorDialogComponent} from "../popup-dialog/error-dialog/error-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmationDialogSuppCatComponent
} from "../popup-dialog/confirmation-dialog-supp-cat/confirmation-dialog-supp-cat.component";


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css',
  providers: [DatePipe]
})
export class CategorieComponent implements OnInit{

  public listCategorie: Array<CategorieModel>[] | any;
  public dataSource: any;
  public displayedColumns = ['nom', 'slug', 'publier', 'description', 'date', 'action'];
  spinnerProgress: boolean = false;
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  constructor(
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private location: Location,
              private router: Router,
              private catService: CategorieService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
      this.catService.listeCat()
        .subscribe(
          data =>{
            this.listCategorie = data;
            this.dataSource = new MatTableDataSource(this.listCategorie);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.isLoading = false;
          },
          error => {
            // console.log(error)
            this.isLoading = false;
          }
        )
  }

  retour() {
    this.router.navigateByUrl("/admin/produit")
  }

  modifier(idCat: string) {
    this.router.navigateByUrl(`/admin/updateCat/${idCat}`)
  }

  supprimer(idCat: string) {

    const dialogRef = this.dialog.open(ConfirmationDialogSuppCatComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinnerProgress = true;
        this.catService.supprimerCat(idCat).subscribe(
          response => {
            this.spinnerProgress = false;
            this.ngOnInit();
            this.snackBar.open('Categorie a ete supprimer avec succès!', 'Fermer', { duration: 3500 });
            this.router.navigateByUrl("/admin/approvion");
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

  ajouterCategorie() {
    this.router.navigateByUrl("/admin/addCat")
  }

  // Méthode pour formater la date
  formatDate(date: Date): string {
    return <string>this.datePipe.transform(date, 'dd/MM/yyyy');
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

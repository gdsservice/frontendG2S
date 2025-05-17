import {Component, OnInit, ViewChild} from '@angular/core';
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {DetteService} from "../../services/dette.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DetteModel} from "../../models/dette.model";
import {ProduitModel} from "../../models/produit.model";
import {MatTableDataSource} from "@angular/material/table";
import {ErrorDialogComponent} from "../popup-dialog/error-dialog/error-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../popup-dialog/confirmation-dialog/confirmation-dialog.component";
import {
  ConfirmationDialogSuppDetteComponent
} from "../popup-dialog/confirmation-dialog-supp-dette/confirmation-dialog-supp-dette.component";
import {ClientModel} from "../../models/client.model";

@Component({
  selector: 'app-dette',
  templateUrl: './dette.component.html',
  styleUrl: './dette.component.css',
  providers: [DatePipe]
})
export class DetteComponent implements OnInit{

  dataSource: any;
  public listeDette!: Array<DetteModel>;
  displayedColumns = ['titre','quantite','reduction','montant','dateDebut','dateFin','clientDTO','utilisateurDette','status','action']
  spinnerProgress: boolean = false;
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private detteService: DetteService,
              private datePipe: DatePipe,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.detteService.listDette()
      .subscribe(
        data => {
          this.listeDette = data;
          this.dataSource = new MatTableDataSource(this.listeDette);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        },
        error => {
          // console.log(error);
          this.isLoading = false;
        }
      )
  }

  ajouterDette() {
    this.router.navigateByUrl("/admin/addDette")
  }

  // Méthode pour formater la date
  formatDate(date: Date): string {
    return <string>this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  modifier(idDette: string) {
    this.router.navigateByUrl(`/admin/updateDette/${idDette}`)
  }

  supprimer(idDette: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogSuppDetteComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinnerProgress = true;
        this.detteService.supprimerDette(idDette).subscribe(
          response => {
            this.spinnerProgress = false;
            this.ngOnInit();
            this.snackBar.open('Dette a ete supprimer avec succès!', 'Fermer', { duration: 3500 });
            this.router.navigateByUrl("/admin/dette");
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

  payerDette(idDette: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinnerProgress = true;
        this.detteService.payerDette(idDette).subscribe(
          response => {
            this.spinnerProgress = false;
            this.ngOnInit();
            this.snackBar.open('Dette payée avec succès!', 'Fermer', { duration: 3500 });
            this.router.navigateByUrl("/admin/dette");
          },
          error => {
            if (error.status === 400) {
              this.spinnerProgress = false;
              this.dialog.open(ErrorDialogComponent, {
                data: {message: error.error}
              });
            }
          }
        );
      }
    });
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

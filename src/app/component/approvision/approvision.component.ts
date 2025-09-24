import {Component, OnInit, ViewChild} from '@angular/core';
import {ApprovService} from "../../services/approv.service";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {ApprovisionModel} from "../../models/approvision.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {ErrorDialogComponent} from "../popup-dialog/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ValidDialogComponent} from "../popup-dialog/valid-dialog/valid-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmationDialogComponent} from "../popup-dialog/confirmation-dialog/confirmation-dialog.component";
import {
  ConfirmationDialogApprovComponent
} from "../popup-dialog/confirmation-dialog-approv/confirmation-dialog-approv.component";
import {
  ConfirmationDialogSuppApprovComponent
} from "../popup-dialog/confirmation-dialog-supp-approv/confirmation-dialog-supp-approv.component";

@Component({
  selector: 'app-approvision',
  templateUrl: './approvision.component.html',
  styleUrl: './approvision.component.css',
  providers: [DatePipe],
})
export class ApprovisionComponent implements OnInit{

  public listApprov!: Array<ApprovisionModel>;
  public dataSource: any;
  displayedColumns = ['designation','quantite','prixUnitaire','cbm','fraisTransit','montant','dateAchat','dateArriver','adresseFrs','etat','utilisateurAprov','action'];
  spinnerProgress: boolean = false;
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private datePipe: DatePipe,
              private approvService : ApprovService,
              private router: Router) {}

  ngOnInit(): void {
    this.approvService.listApprov()
      .subscribe(
        data =>{
          this.listApprov = data;
          this.dataSource = new MatTableDataSource(this.listApprov);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;

          this.dataSource.filterPredicate = (data: ApprovisionModel, filter: string) => {
            return data.adresseFrs.toLowerCase().includes(filter) ||
              data.designation.toLowerCase().includes(filter);
          };
          
        },
        error => {
          this.isLoading = false;
        }
      )
  }

  // Méthode pour formater la date
  formatDate(date: Date): string {
    return <string>this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  ajouterApprov() {
    this.router.navigateByUrl("/admin/addApprov")
  }

  traiter(idApprov: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogApprovComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.spinnerProgress= true;
        this.approvService.traiterApprov(idApprov).subscribe(
          response => {
            this.spinnerProgress= false;
            this.ngOnInit();
            this.snackBar.open('Approvision traite avec succès!', 'Fermer', { duration: 3500 });
            this.router.navigateByUrl("/admin/approvision");
          },
          error => {
            if(error.status === 400){
              this.spinnerProgress= false;
              this.dialog.open(ErrorDialogComponent, {
                data: {message: error.error}
              });
            }
          }
        );
      }
    })
  }

  modifier(idApprov: string) {
    this.router.navigateByUrl(`/admin/updateApprov/${idApprov}`)
  }

  supprimer(idApprov: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogSuppApprovComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinnerProgress = true;
        this.approvService.supprimerApprov(idApprov).subscribe(
          response => {
            this.spinnerProgress = false;
            this.ngOnInit();
            this.snackBar.open('Approvion a ete supprimer avec succès!', 'Fermer', { duration: 3500 });
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

  // Méthode pour appliquer le filtre
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

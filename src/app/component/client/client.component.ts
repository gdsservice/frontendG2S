import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ClientService} from "../../services/client.service";
import {Router} from "@angular/router";
import {ClientModel} from "../../models/client.model";
import {DatePipe} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ErrorDialogComponent} from "../popup-dialog/error-dialog/error-dialog.component";
import {
  ConfirmationDialogSuppClientComponent
} from "../popup-dialog/confirmation-dialog-supp-client/confirmation-dialog-supp-client.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApprovisionModel} from "../../models/approvision.model";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
  providers: [DatePipe],
})
export class ClientComponent implements OnInit{

  public listClient: Array<ClientModel>[] | any;
  public dataSource: any;
  public displayedColumns:any = ['nom', 'prenom', 'adresse', 'telephone', 'email', 'dateAjout','utilisateurClient', 'action'];
  spinnerProgress: boolean = false;
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private snackBar: MatSnackBar,
              private datePipe: DatePipe,
              private router: Router,
              private clientService: ClientService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.clientService.listClient()
      .subscribe(
        data=>{
          this.listClient = data;
          this.dataSource = new MatTableDataSource(this.listClient);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;

          this.dataSource.filterPredicate = (data: ClientModel, filter: string) => {
            return data.nom.toLowerCase().includes(filter) ||
              data.adresse.toLowerCase().includes(filter) ||
              data.telephone.toLowerCase().includes(filter) ||
              data.email.toLowerCase().includes(filter) ||
              data.prenom.toLowerCase().includes(filter);
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

  ajouterClient() {
    this.router.navigateByUrl("/admin/addClient")
  }

  modifier(idClient: ClientModel) {
    this.router.navigateByUrl(`/admin/updateClient/${idClient}`)
  }

  supprimer(idClient: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogSuppClientComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinnerProgress = true;
        this.clientService.supprimerClient(idClient).subscribe(
          response => {
            this.spinnerProgress = false;
            this.ngOnInit();
            this.snackBar.open('Client a ete supprimer avec succès!', 'Fermer', { duration: 3500 });
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

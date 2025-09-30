import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BannerService } from '../../services/banner.service';
import { BannerModel } from '../../models/banner-model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { BannerDAO } from '../../models/banner-dao';
import { Router } from '@angular/router';
import { ConfirmationDialogSuppBannerComponent } from '../popup-dialog/confirmation-dialog-supp-banner/confirmation-dialog-supp-banner.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../popup-dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

  public listBanner!: Array<BannerDAO>;
  public dataSource: any;
  public displayedColumns = ['select', 'image', 'titre', 'sous_titre', 'btn_text', 'btn_link', 'action']
  spinnerProgress: boolean = false;
  isLoading: boolean = true;
  selection = new SelectionModel<BannerModel>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private bannerService: BannerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.bannerService.listBanner()
      .pipe(
        map((banners: BannerDAO[]) => banners.map(banner => ({
          ...banner,
          imageUrl: banner.idBanner ? this.bannerService.getMainImageUrl(banner.idBanner) : ''
        })))
      )
      .subscribe(
        data => {
          this.listBanner = data.map(banner => ({
            ...banner,
            imageUrl: this.bannerService.getImageUrl(banner.idBanner!),
          }));

          this.dataSource = new MatTableDataSource(this.listBanner);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;

        },
        error => {
          console.error('Erreur lors du chargement des banner', error);
          this.isLoading = false;
        }
      );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: BannerModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.titre! + 1}`;
  }

    // Méthode pour appliquer le filtre
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addBanner() {
    this.router.navigateByUrl("/admin/addBanner")
  }

  modifier(idBanner: string) {
    this.router.navigateByUrl(`/admin/updateBanner/${idBanner}`)
   }

  supprimer(idBanner: string) { 
    const dialogRef = this.dialog.open(ConfirmationDialogSuppBannerComponent, {
          width: '400px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.spinnerProgress = true;
            this.bannerService.supprimerBanner(idBanner).subscribe(
              response => {
                this.spinnerProgress = false;
                this.ngOnInit();
                this.snackBar.open('Banner a ete supprimer avec succès!', 'Fermer', { duration: 3500 });
                this.router.navigateByUrl("/admin/banner");
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

  details() { }

}

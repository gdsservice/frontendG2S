import { Component, ViewChild } from '@angular/core';
import { CollectionDAO } from '../../models/collection-dao';
import { SelectionModel } from '@angular/cdk/collections';
import { CollectionModel } from '../../models/collection-model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollectionService } from '../../services/collection.service';
import { map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogSuppCollectionComponent } from '../popup-dialog/confirmation-dialog-supp-collection/confirmation-dialog-supp-collection.component';
import { ErrorDialogComponent } from '../popup-dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent {

  public listCollection!: Array<CollectionDAO>;
    public dataSource: any;
    public displayedColumns = ['select', 'image', 'titre', 'sous_titre', 'btn_text', 'btn_link', 'action']
    spinnerProgress: boolean = false;
    isLoading: boolean = true;
    selection = new SelectionModel<CollectionModel>(true, []);
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    constructor(
      private router: Router,
      private fb: FormBuilder,
      private collectionService: CollectionService,
      private dialog: MatDialog,
      private snackBar: MatSnackBar,
    ) { }
  
    ngOnInit(): void {
      this.collectionService.listCollection()
        .pipe(
          map((collection: CollectionDAO[]) => collection.map(collection => ({
            ...collection,
            imageUrl: collection.idCollection ? this.collectionService.getMainImageUrl(collection.idCollection) : ''
          })))
        )
        .subscribe(
          data => {
            this.listCollection = data.map(collection => ({
              ...collection,
              imageUrl: this.collectionService.getImageUrl(collection.idCollection!),
            }));
  
            this.dataSource = new MatTableDataSource(this.listCollection);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.isLoading = false;
  
          },
          error => {
            console.error('Erreur lors du chargement des collection', error);
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
  
    checkboxLabel(row?: CollectionModel): string {
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
      this.router.navigateByUrl("/admin/addCollection")
    }
  
    modifier(idCollection: string) {
      this.router.navigateByUrl(`/admin/updateCollection/${idCollection}`)
     }
  
    supprimer(idCollection: string) { 
      const dialogRef = this.dialog.open(ConfirmationDialogSuppCollectionComponent, {
            width: '400px',
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.spinnerProgress = true;
              this.collectionService.supprimerCollection(idCollection).subscribe(
                response => {
                  this.spinnerProgress = false;
                  this.ngOnInit();
                  this.snackBar.open('Collection a ete supprimer avec succès!', 'Fermer', { duration: 3500 });
                  this.router.navigateByUrl("/admin/collection");
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

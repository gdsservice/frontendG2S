import { Component } from '@angular/core';
import { CommandeDAOModel } from '../../models/commandeDAO.model';
import { count, lastValueFrom } from 'rxjs';
import { CommandeService } from '../../services/commande.service';
import { ProduitService } from '../../services/produit.service';
import { Router } from '@angular/router';
import { CommandeModel } from '../../models/commande.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogTraiterCdeComponent } from '../popup-dialog/confirmation-dialog-traiter-cde/confirmation-dialog-traiter-cde.component';
import { ErrorDialogComponent } from '../popup-dialog/error-dialog/error-dialog.component';
import { CommandeInputModel } from '../../models/commandeInput-model';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent {

  commandeList: CommandeDAOModel[] = [];
  imageUrls?: string;
  spinnerProgress: boolean = false;
  isLoading: boolean = true;
  

  constructor(
    private commandeService: CommandeService,
    private produitService: ProduitService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  async ngOnInit() {
   this.loadCommandes();
  }
  
  generateOrderId(index: number): string {
  index = index + 1;
  return `#Commande-${index}`;
}

  details(idCde: string) {
    this.router.navigateByUrl(`/admin/commandeDetails/${idCde}`)
  }

  traiter(commande: CommandeModel){
    const dialogRef = this.dialog.open(ConfirmationDialogTraiterCdeComponent, {
          width: '400px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.spinnerProgress = true;
            this.commandeService.traiterCde(commande).subscribe(
              response => {
                this.spinnerProgress = false;
                this.ngOnInit();
                this.snackBar.open('Cette commande a ete traite avec succès!', 'Fermer', { duration: 3500 });
                this.router.navigateByUrl("/admin/commande");
                // test
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


  async loadCommandes() {
    const commandeData = (await lastValueFrom(this.commandeService.listCommande()));
    if (commandeData) {
      this.commandeList = commandeData;
      this.commandeList.forEach((commande,index) => {
        commande.idCommande = this.generateOrderId(index);
      });
      for (const commande of this.commandeList) {
       const produitId = commande.commandeProduitList[0].produit.idProd;
        if (produitId) {
          this.imageUrls = this.produitService.getImageUrl(produitId);
          commande.commandeProduitList[0].produit.imageUrl = this.imageUrls;
        } 
     }
    }
  }
}



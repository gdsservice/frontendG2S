import { Component } from '@angular/core';
import { CommandeDAOModel } from '../../models/commandeDAO.model';
import { count, lastValueFrom } from 'rxjs';
import { CommandeService } from '../../services/commande.service';
import { ProduitService } from '../../services/produit.service';
import { ProduitDAOModel } from '../../models/produitDAO.model ';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent {

  commandeList: CommandeDAOModel[] = [];
  imageUrls?: string;
  

  constructor(
    private commandeService: CommandeService,
    private produitService: ProduitService,
  ) {}

  async ngOnInit() {
   this.loadCommandes();
  }
  
  generateOrderId(index: number): string {
  index = index + 1;
  return `#G2S-${index}`;
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



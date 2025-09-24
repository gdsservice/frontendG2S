import { CommandeModel } from "./commande.model";
import { ProduitModel } from "./produit.model";

export interface CommandeProduitModel {
  quantite: number,
  montant: number,
  produit: ProduitModel,
  commande: CommandeModel,
    
}
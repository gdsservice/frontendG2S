import { CommandeModel } from "./commande.model";
import { CommandeProduitModel } from "./commandeProduit.model";


export interface CommandeDAOModel{
  idCommande: string;
  commande : CommandeModel;
  commandeProduitList : CommandeProduitModel[];

}
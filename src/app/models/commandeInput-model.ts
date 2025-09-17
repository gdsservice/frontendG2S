import { CommandeModel } from "./commande.model";
import { CommandeProduitModel } from "./commandeProduit.model";



export interface CommandeInputModel{

  commande: CommandeModel,
  listCommandeProduit: CommandeProduitModel[],
}
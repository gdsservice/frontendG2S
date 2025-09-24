import {ClientModel} from "./client.model";
import {ProduitModel} from "./produit.model";

export interface DetteModel{

  idDette: string | null,
  titre: string,
  quantite: number,
  reduction: number,
  dateDebut: string,
  dateFin: string,
  note: string,
  clientDTO: ClientModel,
  produitDTOS: ProduitModel[],
}

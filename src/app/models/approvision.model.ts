import {ProduitModel} from "./produit.model";


export interface ApprovisionModel {
  idApprov: string | null,
  designation: string,
  quantite: number,
  prixUnitaire: number,
  cbm: number,
  dateAchat: string,
  dateArriver: string,
  adresseFrs: string,
  image: string,
  description: string,
  produitsApprov: ProduitModel[],
}

/*  export enum Etat{
    ENCORE, ANNULER, ARRIVER
}*/



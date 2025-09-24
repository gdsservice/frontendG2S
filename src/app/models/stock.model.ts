import {ProduitModel} from "./produit.model";

export interface StockModel{

  idStock: string | null,
  designation: string,
  quantite: number,
  montant: number,
  note: string
  produitStockDTO: ProduitModel
}

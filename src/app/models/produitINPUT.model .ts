import {CategorieModel} from "./categorie.model";

export interface ProduitINPUTModel{
  idProd: string | null,
  designation: string,
  quantite: number,
  prixUnitaire: number,
  prixRegulier: number,
  nouveaute: boolean,
  offreSpeciale: boolean,
  vedette: boolean,
  description: string,
  image: any,
  categorieStockProdDTO: CategorieModel,
  note: string,
}

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
  plusVendu:boolean,
  publier:boolean,
  description: string,
  slug: string,
  images?: File[];
  imageUrls?: string[];
  categorieStockProdDTO: CategorieModel,
  note: string,
  info: string,
  caracteristique: string
}

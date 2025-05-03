import {CategorieModel} from "./categorie.model";

export interface ProduitDAOModel{
  idProd: string | null,
  designation: string,
  quantite: number,
  prixUnitaire: number,
  image: any,
  categorieStockProdDTO: CategorieModel,
  note: string,
  imageUrl?: string;
}

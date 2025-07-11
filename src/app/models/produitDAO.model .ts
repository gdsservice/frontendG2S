import { UtilisateurComponent } from "../component/utilisateur/utilisateur.component";
import {CategorieModel} from "./categorie.model";
import { UserModel } from "./user.model";

export interface ProduitDAOModel{
  idProd: string | null,
  designation: string,
  quantite: number,
  prixUnitaire: number,
  image: any,
  categorieStockProdDTO?: CategorieModel,
  note: string,
  imageUrl?: string;
  utilisateurProd?: UserModel,
  montant?: number,
  date?: Date,


    // Nouveau attribut
    slug?: string,
    prixRegulier?: number,
    description?: string,
    nouveaute?: boolean,
    vedette?: boolean,
    offreSpeciale?: boolean,
    plusVendu?: boolean,
    publier?: boolean,
    info: string,
    caracteristique: string
}

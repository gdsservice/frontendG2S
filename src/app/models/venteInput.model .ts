import {CategorieModel} from "./categorie.model";
import { ClientModel } from "./client.model";
import { ClientInputModel } from "./clientInputModel.model ";
import { ProduitModel } from "./produit.model";
import { UserModel } from "./user.model";
import { VenteModel } from "./vente.model";
import { VenteProduitModel } from "./venteProduit.model";

export interface VenteInputModel{

  vente?: VenteModel,
  listVenteProduit: VenteProduitModel[],
}

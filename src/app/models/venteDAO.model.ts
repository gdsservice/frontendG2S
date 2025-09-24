import {VenteModel} from "./vente.model";
import {ProduitModel} from "./produit.model";
import { VenteProduitModel } from "./venteProduit.model";

export interface VenteDAOModel{
  vente : VenteModel;
  venteProduitList : VenteProduitModel[];
}

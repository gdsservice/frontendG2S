import {CategorieModel} from "./categorie.model";
import { ClientModel } from "./client.model";
import { ProduitModel } from "./produit.model";
import { UserModel } from "./user.model";
import { VenteModel } from "./vente.model";

export interface ClientInputModel{
  idClient: string,
  nom: string,
  prenom: string,
  adresse: string,
  telephone: string,
  email: string,
}

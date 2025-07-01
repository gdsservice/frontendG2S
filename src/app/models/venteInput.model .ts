
import { VenteModel } from "./vente.model";
import { VenteProduitModel } from "./venteProduit.model";

export interface VenteInputModel{

  vente?: VenteModel,
  listVenteProduit: VenteProduitModel[],
}

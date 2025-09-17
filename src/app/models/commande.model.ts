import { ClientModel } from "./client.model";

export interface CommandeModel {
    idCde: string;
    total: number;
    quantite: number;
    traiter: boolean;
    dateAjout: Date;
    clientCde?: ClientModel;
    note: string;
    montant?: number;
    reduction?: number;
}
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ProduitModel} from "../models/produit.model";
import {UserModel} from "../models/user.model";
import {StockModel} from "../models/stock.model";
import {ApprovisionModel} from "../models/approvision.model";
import { ProduitINPUTModel } from '../models/produitINPUT.model ';
import { ProduitDAOModel } from '../models/produitDAO.model ';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  // methode recuperation de la liste
  public listProduit():Observable<Array<ProduitDAOModel>>{
    return this.http.get<Array<ProduitDAOModel>>(`${environment.backendHost}/produit/listeProd`);
  }

  ajoutProd(formData: FormData): Observable<ProduitINPUTModel> {
    return this.http.post<ProduitINPUTModel>(`${environment.backendHost}/produit/enregistrerProd`, formData);
  }
  

  getImageUrl(idProd: string): string {
    return `${environment.backendHost}/produit/image/${idProd}`;
  }

  modifierProdAvecImage(formData: FormData, idProd: string): Observable<any> {
    return this.http.put(`${environment.backendHost}/produit/modifierProd/${idProd}`, formData);
  }
  

  afficher(idProd: string) : Observable<ProduitDAOModel> {
    return this.http.get<ProduitDAOModel>(`${environment.backendHost}/produit/afficherProd/${idProd}`);
  }

  supprimerProod(idProd: string) {
    return this.http.put<ProduitINPUTModel>(`${environment.backendHost}/produit/supprimerProd`, (idProd), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}

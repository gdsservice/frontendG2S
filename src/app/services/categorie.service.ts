import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../models/user.model";
import {environment} from "../../environments/environment";
import {CategorieModel} from "../models/categorie.model";
import {StockModel} from "../models/stock.model";
import {ApprovisionModel} from "../models/approvision.model";


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private httpClient: HttpClient) { }

  public listeCat():Observable<Array<CategorieModel>>{
    return this.httpClient.get<Array<CategorieModel>>(`${environment.backendHost}/categorie/listeCat`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  public  ajoutCat(cat: CategorieModel): Observable<CategorieModel> {
    return this.httpClient.post<CategorieModel>(`${environment.backendHost}/categorie/creerCat`,(cat), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  afficher(catId: string): Observable<CategorieModel> {
    return this.httpClient.get<CategorieModel>(`${environment.backendHost}/categorie/afficherCat/${catId}`);
  }

  modifierCat(cat: CategorieModel) : Observable<CategorieModel> {
    return this.httpClient.put<CategorieModel>(`${environment.backendHost}/categorie/modifierCat/${cat.idCat}`, cat, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  supprimerCat(idCat: string) {
    return this.httpClient.put<CategorieModel>(`${environment.backendHost}/categorie/supprimerCat`, (idCat), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}

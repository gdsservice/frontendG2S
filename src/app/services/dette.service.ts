import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {DetteModel} from "../models/dette.model";
import {ApprovisionModel} from "../models/approvision.model";
import {VenteModel} from "../models/vente.model";

@Injectable({
  providedIn: 'root'
})
export class DetteService {

  constructor(private httpClient: HttpClient) {
  }

  public listDette(): Observable<Array<DetteModel>> {
    return this.httpClient.get<Array<DetteModel>>(`${environment.backendHost}/dette/listeDette`)
  }

  afficher(idDette: string): Observable<DetteModel> {
    return this.httpClient.get<DetteModel>(`${environment.backendHost}/dette/afficherDette/${idDette}`)
  }

  public modifierDette(dette: DetteModel): Observable<DetteModel> {
    return this.httpClient.put<DetteModel>(`${environment.backendHost}/dette/modifierDette/${dette.idDette}`, dette, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  ajoutDette(dette: DetteModel) {
    return this.httpClient.post<DetteModel>(`${environment.backendHost}/dette/enregistrerDette`, (dette), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  payerDette(idDette: string) {
    return this.httpClient.put<DetteModel>(`${environment.backendHost}/dette/payerDette`, (idDette), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  supprimerDette(idDette: string) {
    return this.httpClient.put<DetteModel>(`${environment.backendHost}/dette/supprimerDette`, (idDette), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ClientModel} from "../models/client.model";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {StockModel} from "../models/stock.model";
import {ApprovisionModel} from "../models/approvision.model";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  public listClient(){
    return  this.http.get<Array<ClientModel>>(`${environment.backendHost}/client/listeClient`)
  }

  public totalClient(){
    return  this.http.get<number>(`${environment.backendHost}/client/totalClient`)
  }

  public afficher(idClient: string): Observable<ClientModel> {
    return this.http.get<ClientModel>(`${environment.backendHost}/client/afficherClient/${idClient}` );
  }


  modifierClient(client: ClientModel): Observable<ClientModel> {
    return this.http.put<ClientModel>(`${environment.backendHost}/client/modifierClient/${client.idClient}`, client, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  ajoutClient(client: ClientModel) {
    return this.http.post<ClientModel>(`${environment.backendHost}/client/ajouterClient`,(client), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  supprimerClient(idClient: string) {
    return this.http.put<ClientModel>(`${environment.backendHost}/client/supprimerClient`, (idClient), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ApprovisionModel} from "../models/approvision.model";
import {DetteModel} from "../models/dette.model";

@Injectable({
  providedIn: 'root'
})
export class ApprovService {

  constructor(private http: HttpClient) { }

  public listApprov():Observable<Array<ApprovisionModel>>{
    return this.http.get<Array<ApprovisionModel>>(`${environment.backendHost}/approvision/listeApprov`)
  }

  afficher(idApprov: string): Observable<ApprovisionModel> {
    return this.http.get<ApprovisionModel>(`${environment.backendHost}/approvision/afficherApprov/${idApprov}`)
  }

  public modifierApprov(approv: ApprovisionModel): Observable<ApprovisionModel> {
    return this.http.put<ApprovisionModel>(`${environment.backendHost}/approvision/modifierApprov/${approv.idApprov}`, approv, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  ajoutApprov(approv: ApprovisionModel) {
    return this.http.post<ApprovisionModel>(`${environment.backendHost}/approvision/creerApprov`, (approv), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }

  traiterApprov(idApprov: string) {
      return this.http.post<ApprovisionModel>(`${environment.backendHost}/approvision/traiterApprov`,(idApprov), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  supprimerApprov(idApprov: string) {
    return this.http.put<ApprovisionModel>(`${environment.backendHost}/approvision/supprimerApprov`, (idApprov), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}

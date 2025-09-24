import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { VenteDAOModel } from '../models/venteDAO.model';
import { VenteModel } from '../models/vente.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {ClientModel} from "../models/client.model";
import {ApprovisionModel} from "../models/approvision.model";
import { VenteProduitModel } from '../models/venteProduit.model';
import { VenteInputModel } from '../models/venteInput.model ';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  public listeVente!: VenteDAOModel[];

  constructor(private http: HttpClient) { }

  public listVente(): Observable<VenteDAOModel[]> {
    return this.http.get<VenteDAOModel[]>(`${environment.backendHost}/vente/listeVente`);
  }

  public totalVente(){
    return  this.http.get<number>(`${environment.backendHost}/vente/totalVente`)
  }

  afficher(idVente: string): Observable<VenteDAOModel> {
    return this.http.get<VenteDAOModel>(`${environment.backendHost}/vente/afficherVente`, {
      params: new HttpParams().set('idVente', idVente)
    });
  }

  public modifierVente(venteProduit: VenteInputModel): Observable<VenteInputModel> {
    return this.http.put<VenteInputModel>(`${environment.backendHost}/vente/modifier/${venteProduit.vente!.idVente}`, venteProduit, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  ajoutVente(venteInput: VenteInputModel) {
    return this.http.post<VenteModel>(`${environment.backendHost}/vente/effectuerVente`, venteInput, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  annuler(vente: VenteModel) {
    return this.http.post<VenteModel>(`${environment.backendHost}/vente/annulerVente`,vente, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  supprimer(venteId: string) {
    return this.http.put<VenteModel>(`${environment.backendHost}/vente/supprimerVente`, venteId, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  telechargerPdf(idVente: any) {
    return this.http.get(`${environment.backendHost}/pdf/imprimer/${idVente}`, {
      responseType: 'blob'
    });
  }
}

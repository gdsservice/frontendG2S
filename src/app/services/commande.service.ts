import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CommandeDAOModel } from '../models/commandeDAO.model';
import { CommandeInputModel } from '../models/commandeInput-model';
import { CommandeModel } from '../models/commande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http: HttpClient) {}

  listCommande(): Observable<CommandeDAOModel[]> {
      return this.http.get<CommandeDAOModel[]>(`${environment.backendHost}/commande/listCommande`);
    }
  
  listCommandeTraiter(): Observable<CommandeDAOModel[]> {
      return this.http.get<CommandeDAOModel[]>(`${environment.backendHost}/commande/listCommandeTraiter`);
    }

  afficher(idCde: string): Observable<CommandeDAOModel> {
      return this.http.get<CommandeDAOModel>(`${environment.backendHost}/commande/afficher`, {
          params: new HttpParams().set('idCde', idCde)
        });
      }

  traiterCde(commande: CommandeModel): Observable<CommandeDAOModel>{
      return this.http.put<CommandeDAOModel>(`${environment.backendHost}/commande/traiterCde`, (commande), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
    }

  

    
}

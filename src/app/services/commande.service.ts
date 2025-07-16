import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CommandeDAOModel } from '../models/commandeDAO.model';

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

  

    
}

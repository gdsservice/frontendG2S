import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserModel, UserRole} from "../models/user.model";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ApprovisionModel} from "../models/approvision.model";
import {ProduitModel} from "../models/produit.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

   listeUser():Observable<Array<UserModel>>{
     return this.httpClient.get<Array<UserModel>>(`${environment.backendHost}/user/userListe`, {
       headers: new HttpHeaders().set('Content-Type', 'application/json')
     });
  }

   ajoutUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${environment.backendHost}/user/creer`,(user), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

   listeRole():Observable<Array<UserRole>>{
    return this.httpClient.get<Array<UserRole>>(`${environment.backendHost}/user/roleListe`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  public modifier(user: UserModel): Observable<UserModel> {
    return this.httpClient.put<UserModel>(`${environment.backendHost}/user/modifier/${user.id}`, user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  afficher(id: number) : Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${environment.backendHost}/user/user/${id}`);
  }

  supprimer(id: number|null) {
    return this.httpClient.put<UserModel>(`${environment.backendHost}/user/supprimer`, (id), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}

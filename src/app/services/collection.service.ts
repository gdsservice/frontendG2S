import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { CollectionDAO } from '../models/collection-dao';
import { CollectionINPUT } from '../models/collection-input';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }
  
    addCollection(formData: FormData): Observable<CollectionINPUT> {
      return this.http.post<CollectionINPUT>(
        `${environment.backendHost}/collections/addCollection`, formData
      );
    }
  
    // methode recuperation de la liste
    public listCollection(): Observable<Array<CollectionDAO>> {
      return this.http.get<Array<CollectionDAO>>(`${environment.backendHost}/collections/listeCollection`);
    }
  
    getMainImageUrl(idCollection: string): string {
      return `${environment.backendHost}/images/collections/main/${idCollection}`;
    }
  
    getImageUrl(idCollection: string): string {
      return `${environment.backendHost}/images/collections/${idCollection}`;
    }
  
    afficher(idCollection: string): Observable<CollectionDAO> {
      return this.http.get<CollectionDAO>(`${environment.backendHost}/collections/afficherCollection/${idCollection}`);
    }
  
    modifierCollectionAvecImage(formData: FormData, idCollection: string): Observable<any> {
      return this.http.put(`${environment.backendHost}/collections/modifierCollection/${idCollection}`, formData);
    }
  
      supprimerCollection(idCollection: string) {
        return this.http.put<CollectionINPUT>(`${environment.backendHost}/collections/supprimerCollection`, (idCollection), {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
      }
}

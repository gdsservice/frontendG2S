import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BannerINPUT } from '../models/banner-input';
import { environment } from "../../environments/environment";
import { BannerDAO } from '../models/banner-dao';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  banners: BannerDAO[] = [];

  constructor(private http: HttpClient) { }

  addBanner(formData: FormData): Observable<BannerINPUT> {
    return this.http.post<BannerINPUT>(
      `${environment.backendHost}/banner/addBanner`, formData
    );
  }

  // methode recuperation de la liste
  public listBanner(): Observable<Array<BannerDAO>> {
    return this.http.get<Array<BannerDAO>>(`${environment.backendHost}/banner/listeBanner`);
  }

  getMainImageUrl(idBanner: string): string {
    return `${environment.backendHost}/images/banner/main/${idBanner}`;
  }

  getImageUrl(idBanner: string): string {
    return `${environment.backendHost}/images/banner/${idBanner}`;
  }
}

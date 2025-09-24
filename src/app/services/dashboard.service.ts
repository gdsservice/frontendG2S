import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClientModel} from "../models/client.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

}

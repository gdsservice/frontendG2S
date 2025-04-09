import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {TypeRole, UserModel} from "../models/user.model";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  accessToken: any;
  listUser: UserModel | any;
  decoderToken: any;
  isAuthen: boolean | undefined;
  roles: any;
  token: string | any;


  constructor( private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit(){
    this.loadJwtTokenLocalStorage();
  }

  public login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    };
    let body = { username: username, password: password };
    return this.httpClient.post(`${environment.backendHost}/auth/login`, body, options);
  }


  loadProfile(data: any) {
    this.accessToken = data['bearer'];
    this.decoderToken = jwtDecode(this.accessToken);
    this.isAuthen = this.decoderToken.auth;
    this.isAuthen = true;
    const now = new Date().getTime();
    window.localStorage.setItem("jwt-token", data.bearer);
    window.localStorage.setItem("jwt-timestamp", now.toString());
    this.listUser = this.decoderToken;

    if (this.listUser?.roles && Array.isArray(this.listUser.roles)) {
      this.roles = this.listUser.roles.map((role: { name: any; }) => role.name);
    }

  }

  logout() {
    this.isAuthen = false;
    this.listUser = undefined;
    this.roles = undefined;
    this.decoderToken = undefined;
    this.router.navigateByUrl("/login");
  }


  loadJwtTokenLocalStorage() {
    this.token = window.localStorage.getItem("jwt-token");
    const timestamp = window.localStorage.getItem("jwt-timestamp");

    if (this.token && timestamp) {
      const now = new Date().getTime();
      const oneDay = 12 * 30 * 30 * 1000;

      if (now - parseInt(timestamp) > oneDay) {
        window.localStorage.removeItem("jwt-token");
        window.localStorage.removeItem("jwt-timestamp");
        // this.router.navigateByUrl("/admin/dashboard");
        this.logout();
        
        // console.log("Token expiré et supprimé");
      } else {
        this.loadProfile({"bearer" : this.token});
        this.isAuthen = true;
        // this.router.navigateByUrl("/admin/dashboard");
      }
    } else {
      // console.log("Pas de token trouvé ou timestamp absent");
    }
  }

}


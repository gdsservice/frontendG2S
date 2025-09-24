import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {LoginService} from "../services/login.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor{

  constructor(private loginService: LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes("/auth/login")){
      let newRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' +this.loginService.accessToken)
      });
      return next.handle(newRequest);
    }else{
      return next.handle(req)
    }
  }
}

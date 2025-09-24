import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from "@angular/core";
import {LoginService} from "../services/login.service";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private authService: LoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.isAuthen){
      return true;
    }
    else {
      this.router.navigateByUrl("/login")
      return false
    }

  }

}

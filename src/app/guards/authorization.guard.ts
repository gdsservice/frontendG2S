import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from "@angular/core";
import {LoginService} from "../services/login.service";

@Injectable()
export class AuthorizationGuard implements CanActivate{

  constructor(private authService: LoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.isAuthen){
      let requiredRoles = route.data['roles'];
      let userRoles = this.authService.roles;
      for(let role of userRoles){
        if (requiredRoles.includes(role)) {
          return true;
        }
      }
      return false;
    }
    else {
      this.router.navigateByUrl("/login")
      return false
    }

  }

}

import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {

    if(state.url == '/vehicles') {
      if(this.loginService.isAdmin )  {
        this.router.navigate(['/dashboard']);
      } else {
        return true;
      }
    }

    if(!this.loginService.isLogged){
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    }

    const expectedRole = route.data.expectedRole;

    if(expectedRole && !this.loginService.currentUserValue.roles.includes(expectedRole)) return false;

    return true;
  }
}

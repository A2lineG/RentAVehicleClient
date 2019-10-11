import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

// import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs/Observable';
import { LoginService } from 'app/login/login.service';

@Injectable()
export class TokenInterceptor {

  /**
   * Creates an instance of TokenInterceptor.
   * @memberof TokenInterceptor
   */
  constructor(private loginService : LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = this.loginService.currentUserValue;
    if (currentUser && currentUser.token) {
        request = request.clone({
            setHeaders: { 
                Authorization: `Bearer ${currentUser.token}`
            }
        });
    }

    return next.handle(request);
  }
}

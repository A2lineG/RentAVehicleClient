import { Injectable, OnInit } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountAPI, UserLoginDTO } from 'app/api/api';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class LoginService {

    private currentUserSubject: BehaviorSubject<UserLoginDTO>;
    public currentUser: Observable<UserLoginDTO>;

    constructor(
      private http: HttpClient,
      private accountApi : AccountAPI,
      private route: ActivatedRoute,
      private router: Router) {

        var userLogin = new UserLoginDTO();

        userLogin.init(JSON.parse(localStorage.getItem('currentUser')));

        this.currentUserSubject = new BehaviorSubject<UserLoginDTO>(userLogin);
        this.currentUser = this.currentUserSubject.asObservable();

      }

    public get currentUserValue(): UserLoginDTO {
        return this.currentUserSubject.value;
    }

    public get isLogged(): boolean {
      if(!this.currentUserValue) return false;
      if(!this.currentUserValue.roles) return false;

      return true;
    }

    public get isAdmin(): boolean {
      if(!this.currentUserValue) return false;

      if(this.currentUserValue.roles) {
        return this.currentUserValue.roles.includes("admin");
      }

      return false;
    }

    public get isUser(): boolean {
      if(!this.currentUserValue) return false;

      if(this.currentUserValue.roles) {
        return this.currentUserValue.roles.includes("user");
      }

      return false;
    }

    login(username, password, redirection) {
        var data = "username=" + username + "&password=" + password + "&grant_type=password";

        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded' });

        return this.http.post(ENV.API_BASE_URL + '/token', data, { headers: reqHeader }).pipe(
            map<TokenResult, TokenResult>(val => {

                var loginUser = new UserLoginDTO();
                loginUser.token = val.access_token;

                this.currentUserSubject.next(loginUser);

                this.accountApi.getUserInfo().subscribe(result => {
                    result.token = val.access_token;

                    this.currentUserSubject.next(result);

                    localStorage.setItem('currentUser', JSON.stringify(this.currentUserValue));

                    this.router.navigateByUrl(this.isUser ? redirection : "/");
                },
                error => {
                    return error;
                });

                return val;
            })
        );
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}

export class TokenResult {
    access_token?: string | undefined;
    token_type?: string | undefined;
    expires_in?: number | undefined;
}

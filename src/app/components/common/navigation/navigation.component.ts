import { Component } from '@angular/core';
import {Router} from '@angular/router';
import 'jquery-slimscroll';
import { LoginService } from 'app/login/login.service';
import { UserLoginDTO } from 'app/api/api';
import { smoothlyMenu } from 'app/app.helpers';

declare var jQuery:any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent {

  constructor(private router: Router, private loginService : LoginService) {}

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();

    if (jQuery("body").hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      })
    }
  }

  activeRoute(routename: string): boolean{
    return this.router.url.indexOf(routename) > -1;
  }

  public get loggedUser(): UserLoginDTO {
    return this.loginService.currentUserValue;
  }

  isUser() {
    return this.loginService.isUser;
  }

  isAdmin() {
    return this.loginService.isAdmin;
  }

  logout() {
    this.loginService.logout();
  }
}

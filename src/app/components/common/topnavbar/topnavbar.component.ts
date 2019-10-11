import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { LoginService } from 'app/login/login.service';
declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  constructor(private loginService: LoginService) {

  }

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

  logout() {
    this.loginService.logout();
  }

  get isLogged() {
    return this.loginService.isLogged;
  }
}

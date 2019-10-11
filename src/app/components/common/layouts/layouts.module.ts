import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

import {BsDropdownModule} from 'ngx-bootstrap';

import {BasicLayoutComponent} from "./basicLayout.component";
import {BlankLayoutComponent} from "./blankLayout.component";

import {NavigationComponent} from "./../navigation/navigation.component";
import {FooterComponent} from "./../footer/footer.component";
import {TopNavbarComponent} from "./../topnavbar/topnavbar.component";
import {TopNavigationNavbarComponent} from "./../topnavbar/topnavigationnavbar.component";
import { DesignModule } from 'app/design.module';


@NgModule({
  declarations: [
    FooterComponent,
    BasicLayoutComponent,
    BlankLayoutComponent,
    NavigationComponent,
    TopNavbarComponent,
    TopNavigationNavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    DesignModule
  ],
  exports: [
    FooterComponent,
    BasicLayoutComponent,
    BlankLayoutComponent,
    NavigationComponent,
    TopNavbarComponent,
    TopNavigationNavbarComponent
  ],
})

export class LayoutsModule {}

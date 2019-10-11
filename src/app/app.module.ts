import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';

// App views
import {DashboardsModule} from "./views/dashboards/dashboards.module";
import {AppviewsModule} from "./views/appviews/appviews.module";

// App modules/components
import {LayoutsModule} from "./components/common/layouts/layouts.module";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ClientModule } from './client/client.module';
import { AuthGuard } from './auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './api/TokenInterceptor';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { AccountAPI, API_BASE_URL } from './api/api';
import { RegisterComponent } from './register/register.component';
import { DesignModule } from './design.module';
import { environment } from 'environments/environment';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LineChartComponent } from './dashboard/line-chart/line-chart.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    LineChartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DesignModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true
    }),
    DashboardsModule,
    LayoutsModule,
    AppviewsModule,
    AngularFontAwesomeModule,
    ClientModule,
    VehicleModule,
    MaintenanceModule,
    MDBBootstrapModule.forRoot()

  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: API_BASE_URL, useValue: environment.API_BASE_URL },
    AuthGuard,
    LoginService,
    AccountAPI
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicLayoutComponent } from './components/common/layouts/basicLayout.component';
import { AuthGuard } from './auth-guard.service';
import { ClientModule } from './client/client.module';
import { LoginComponent } from './login/login.component';
import { VehicleModule } from './vehicle/vehicle.module';
import { BookingModule } from './booking/booking.module';
import { RegisterComponent } from './register/register.component';
import { ContactModule } from './contact/contact.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
  {
    path: 'login',
    children: [
      {path: '', component: LoginComponent}
    ]
  },
  {
    path: 'register',
    children: [
      {path: '', component: RegisterComponent}
    ]
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      {
        path: 'clients',
        loadChildren: () => ClientModule
      },
      {
        path: 'contact',
        loadChildren: () => ContactModule,
      },
      {
        path: 'vehicles',
        loadChildren: () => VehicleModule
      },
      {
        path: 'bookings',
        loadChildren: () => BookingModule
      },
      {
        path: 'maintenance',
        loadChildren: () => MaintenanceModule
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: "admin"
        }
      },
      {
        path: '**',
        redirectTo: 'vehicles'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

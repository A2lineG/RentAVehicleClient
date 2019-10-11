import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceComponent } from './maintenance.component';
import { DesignModule } from 'app/design.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AuthGuard } from 'app/auth-guard.service';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceDetailComponent } from './maintenance-detail/maintenance-detail.component';
import { MaintenanceAPI } from 'app/api/api';

@NgModule({
  declarations: [MaintenanceComponent, MaintenanceDetailComponent],
  imports: [
    CommonModule,
    DesignModule,
    MaintenanceRoutingModule,
    FullCalendarModule
  ],
  providers: [
    AuthGuard,
    MaintenanceAPI
  ]
})
export class MaintenanceModule { }

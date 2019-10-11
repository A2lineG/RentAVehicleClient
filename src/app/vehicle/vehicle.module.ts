import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleAPI, BrandAPI, ModelAPI, OptionVehicleAPI } from 'app/api/api';
import { DesignModule } from 'app/design.module';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { VehicleListAdminComponent } from './vehicle-list-admin/vehicle-list-admin.component';
import { VehicleCreateComponent } from './vehicle-create/vehicle-create.component';
import { VehicleUpdateDetailComponent } from './vehicle-update-detail/vehicle-update-detail.component';
import { AuthGuard } from 'app/auth-guard.service';
import { Dashboard4Component } from 'app/views/dashboards/dashboard4.component';

@NgModule({
  declarations:
  [
    VehicleListComponent,
    VehicleDetailComponent,
    VehicleListAdminComponent,
    VehicleCreateComponent,
    VehicleUpdateDetailComponent,    
  ],
  imports: [
    CommonModule,
    DesignModule,
    VehicleRoutingModule
  ],
  providers: [
    VehicleAPI,
    BrandAPI,
    ModelAPI,
    OptionVehicleAPI,
    AuthGuard
  ],
})
export class VehicleModule { }

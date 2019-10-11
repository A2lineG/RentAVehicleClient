import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { VehicleListAdminComponent } from './vehicle-list-admin/vehicle-list-admin.component';
import { VehicleCreateComponent } from './vehicle-create/vehicle-create.component';
import { VehicleUpdateDetailComponent } from './vehicle-update-detail/vehicle-update-detail.component';
import { AuthGuard } from 'app/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: VehicleListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id',
    component: VehicleDetailComponent,
  },
  {
    path: 'create',
    component: VehicleCreateComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: "admin"
    }
  },
  {
    path: 'grid',
    component: VehicleListAdminComponent,
    children: [{
      path: ':id',
      component: VehicleUpdateDetailComponent,
    }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/auth-guard.service';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenanceDetailComponent } from './maintenance-detail/maintenance-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: "admin"
    },
    children: [{
      path: ':id',
      component: MaintenanceDetailComponent,
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }

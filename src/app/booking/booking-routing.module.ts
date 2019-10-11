import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingCreateComponent } from './booking-create/booking-create.component';
import { BookingListClientComponent } from './booking-list-client/booking-list-client.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { AuthGuard } from 'app/auth-guard.service';
import { BookingListAdminComponent } from './booking-list-admin/booking-list-admin.component';
import { BookingDetailBarreLayoutComponent } from './booking-detail-barre-layout/booking-detail-barre-layout.component';

const routes: Routes = [
  {
    path: 'create/:id',
    component: BookingCreateComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: "user"
    }
  },

  {
    path: 'list',
    component: BookingDetailBarreLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: "user"
    }
  },

  {
    path: 'listAdmin',
    component: BookingListAdminComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: "admin"
    }
  },

  {
    path: 'detail/:id',
    component: BookingDetailComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }

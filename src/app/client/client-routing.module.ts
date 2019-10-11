import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client-list/client.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientUpdateDetailComponent } from './client-update-detail/client-update-detail.component';
import { BookingListClientComponent } from 'app/booking/booking-list-client/booking-list-client.component';
import { AuthGuard } from 'app/auth-guard.service';

const routes: Routes = [
  { 
    path: '', 
    component: ClientComponent,    
  },

  {
    path: 'clients',
    component: ClientComponent,
    children: [{
      path: ':id',
      component: ClientUpdateDetailComponent,
    }]

  },

  { 
    path: 'detail/:id', 
    component: ClientDetailComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: "admin"
    }
  },

  { 
    path: 'detail', 
    component: ClientDetailComponent,   
    canActivate: [AuthGuard],
    data: {
      expectedRole: "user"
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
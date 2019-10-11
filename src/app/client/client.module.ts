import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { DesignModule } from 'app/design.module';
import { ClientService } from './client.service';
import { ClientComponent } from './client-list/client.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientFormDialogComponent } from './client-form-dialog/client-form-dialog.component';
import { ClientAPI, BookingAPI, OpinionAPI } from 'app/api/api';
import { ClientUpdateDetailComponent } from './client-update-detail/client-update-detail.component';
import { BookingModule } from 'app/booking/booking.module';
import { BookingListClientComponent } from 'app/booking/booking-list-client/booking-list-client.component';
import { ClientOpinionListComponent } from './client-opinion-list/client-opinion-list.component';

@NgModule({
  declarations: [
    ClientComponent,
    ClientFormDialogComponent,
    ClientDetailComponent,
    ClientUpdateDetailComponent,
    ClientOpinionListComponent,
  ],

  imports: [
    CommonModule,
    ClientRoutingModule,
    DesignModule,
    BookingModule,    
  ],
  providers: [  
    ClientService,
    ClientAPI,
    BookingAPI,
    OpinionAPI,
  ],
  entryComponents: [
    ClientFormDialogComponent
  ]
})
export class ClientModule { }

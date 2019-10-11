import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingCreateComponent } from './booking-create/booking-create.component';
import { BookingRoutingModule } from './booking-routing.module';
import { VehicleAPI, BrandAPI, OptionBookingAPI, DepotAPI, BookingAPI } from 'app/api/api';
import { DesignModule } from 'app/design.module';
import { BookingListClientComponent } from './booking-list-client/booking-list-client.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { AuthGuard } from 'app/auth-guard.service';
import { BookingListAdminComponent } from './booking-list-admin/booking-list-admin.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BookingDetailBarreLayoutComponent } from './booking-detail-barre-layout/booking-detail-barre-layout.component';

@NgModule({
  declarations:
  [
    BookingCreateComponent,
    BookingListClientComponent,
    BookingDetailComponent,
    BookingListAdminComponent,
    BookingDetailBarreLayoutComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    DesignModule,
    FullCalendarModule
  ],
  exports: [
    BookingListClientComponent,
    BookingDetailBarreLayoutComponent,
  ],
  providers: [
    VehicleAPI,
    BrandAPI,
    OptionBookingAPI,
    DepotAPI,
    BookingAPI,
    AuthGuard
  ],
})
export class BookingModule { }

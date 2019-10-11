import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { DesignModule } from 'app/design.module';
import { GenerateMailComponent } from './generate-mail/generate-mail.component';
import { ViewMailComponent } from './view-mail/view-mail.component';
import { ListMailComponent } from './list-mail/list-mail.component';
import { ContactRoutingModule } from './contact-routing.module';



@NgModule({
  declarations: 
  [
    ContactPageComponent,
    GenerateMailComponent,
    ViewMailComponent,
    ListMailComponent
  ],
  imports: [
    CommonModule,
    DesignModule,
    ContactRoutingModule,
  ],
  exports: [
    ContactPageComponent,
    GenerateMailComponent,
  ],
})
export class ContactModule { }

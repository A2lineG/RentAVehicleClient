import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/auth-guard.service';
import { ContactPageComponent } from './contact-page/contact-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: ContactPageComponent,    
  }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
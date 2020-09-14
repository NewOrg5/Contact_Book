import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateContactComponent } from './create-contact/create-contact.component';


const routes: Routes = [
  {
    path:"",
    component:CreateContactComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

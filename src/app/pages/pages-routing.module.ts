import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { LayoutComponent } from '../layout/layout.component';

const routes: Routes = [
  {
    path: "", component: BookingComponent
  },
  {
    path: "management", component: LayoutComponent, loadChildren: () => import('./management/management.module').then(m => m.ManagementModule)
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceBankingComponent } from './service-banking/service-banking.component';
import { EmployeeComponent } from './employee/employee.component';
import { TicketComponent } from './ticket/ticket.component';
import { ScreenComponent } from './screen/screen.component';
import { AuthGuard } from 'src/app/cors/guards/auth.guard';

const routes: Routes = [
    {
        path: "service",
        component: ServiceBankingComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "employee",
        component: EmployeeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "ticket",
        component: TicketComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "screen",
        component: ScreenComponent,
        canActivate: [AuthGuard] 
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {}
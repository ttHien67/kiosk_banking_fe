import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceBankingComponent } from './service-banking/service-banking.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
    {
        path: "service",
        component: ServiceBankingComponent
    },
    {
        path: "employee",
        component: EmployeeComponent
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {}
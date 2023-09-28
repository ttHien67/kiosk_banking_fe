import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServiceBankingComponent } from './service-banking/service-banking.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ManagementRoutingModule } from './management-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { ServiceBankingModalComponent } from './service-banking/service-banking-modal/service-banking-modal.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import { EmployeeModalComponent } from './employee/employee-modal/employee-modal.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketModalComponent } from './ticket/ticket-modal/ticket-modal.component';
import { ScreenComponent } from './screen/screen.component';
import { ScreenModalComponent } from './screen/screen-modal/screen-modal.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { MenuModalComponent } from './menu/menu-modal/menu-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    ManagementRoutingModule,
    NgxDropzoneModule,
    NgSelectModule,
    NgxScannerQrcodeModule,
    NgApexchartsModule,
  ],
  declarations: [
    ServiceBankingComponent,
    ServiceBankingModalComponent,
    EmployeeComponent,
    EmployeeModalComponent,
    TicketComponent,
    TicketModalComponent,
    ScreenComponent,
    ScreenModalComponent,
    DashboardComponent,
    MenuComponent,
    MenuModalComponent,
  ],
})
export class ManagementModule {}

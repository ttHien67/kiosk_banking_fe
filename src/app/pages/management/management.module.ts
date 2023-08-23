import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ServiceBankingComponent } from "./service-banking/service-banking.component";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { ManagementRoutingModule } from "./management-routing.module";
import { EmployeeComponent } from "./employee/employee.component";
import { ServiceBankingModalComponent } from "./service-banking/service-banking-modal/service-banking-modal.component";
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import { EmployeeModalComponent } from "./employee/employee-modal/employee-modal.component";
import { TicketComponent } from "./ticket/ticket.component";
import { TicketModalComponent } from "./ticket/ticket-modal/ticket-modal.component";
import { ScreenComponent } from "./screen/screen.component";
import { ScreenModalComponent } from "./screen/screen-modal/screen-modal.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NgbPaginationModule,
        ReactiveFormsModule,
        ManagementRoutingModule,
        NgxDropzoneModule,
        NgSelectModule
    ],
    declarations: [
        ServiceBankingComponent,
        ServiceBankingModalComponent,
        EmployeeComponent,
        EmployeeModalComponent,
        TicketComponent,
        TicketModalComponent,
        ScreenComponent,
        ScreenModalComponent

    ]
})

export class ManagementModule{}
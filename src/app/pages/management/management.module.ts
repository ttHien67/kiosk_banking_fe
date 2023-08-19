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


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NgbPaginationModule,
        ReactiveFormsModule,
        ManagementRoutingModule,
        NgxDropzoneModule
    ],
    declarations: [
        ServiceBankingComponent,
        ServiceBankingModalComponent,
        EmployeeComponent,

    ]
})

export class ManagementModule{}
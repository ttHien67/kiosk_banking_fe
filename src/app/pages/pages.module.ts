import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PagesRoutingModule } from "./pages-routing.module";
import { BookingComponent } from "./booking/booking.component";
import { LayoutModule } from "../layout/layout.module";
import { ReactiveFormsModule } from "@angular/forms";
import { BookingModalComponent } from "./booking/booking-modal/booking-modal.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PagesRoutingModule,
        LayoutModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule
    ],
    declarations: [
        BookingComponent,
        BookingModalComponent
    ]
})

export class PagesModule{}
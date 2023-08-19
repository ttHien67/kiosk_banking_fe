import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PagesRoutingModule } from "./pages-routing.module";
import { BookingComponent } from "./booking/booking.component";
import { LayoutModule } from "../layout/layout.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PagesRoutingModule,
        LayoutModule,
        ReactiveFormsModule,

    ],
    declarations: [
        BookingComponent
    ]
})

export class PagesModule{}
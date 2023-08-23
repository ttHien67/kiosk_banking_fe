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
import { QrcodeGenerationComponent } from "./booking/qrcode-generation/qrcode-generation.component";
import { QRCodeModule } from 'angularx-qrcode';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { TvScreenComponent } from "./tv-screen/tv-screen.component";
import { SpeechModule } from './speech';
import { CommentModalComponent } from "./booking/comment-modal/comment-modal.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PagesRoutingModule,
        LayoutModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule,
        QRCodeModule,
        NgxScannerQrcodeModule,
        SpeechModule  
    ],
    declarations: [
        BookingComponent,
        BookingModalComponent,
        QrcodeGenerationComponent,
        TvScreenComponent,
        CommentModalComponent
    ]
})

export class PagesModule{}
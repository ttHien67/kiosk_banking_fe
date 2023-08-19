import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { LayoutComponent } from "./layout.component";


@NgModule({
    declarations: [
        LayoutComponent,
        SidebarComponent,
        FooterComponent,
        NavbarComponent,
    ],
    imports: [
      CommonModule,
      RouterModule,
    ],
    exports:[
    ]
  })
  export class LayoutModule { }
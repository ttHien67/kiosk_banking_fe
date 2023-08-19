import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
    declarations: [
        LoginComponent, 
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      AuthRoutingModule
    ]
})
export class AuthModule { }
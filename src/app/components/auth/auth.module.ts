import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatOptionModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from "src/app/services/auth-service.service";
import { CalendarRoutingModule } from "../views/calendar/calendar-routing.module";
import { LoginRoutingModule } from "./login/login-routing.module";

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		BrowserAnimationsModule,
		BrowserModule,
		MatFormFieldModule,
		FormsModule,
		MatOptionModule,
		MatIconModule,
		MatInputModule,
		MatButtonModule,
		ReactiveFormsModule,
		CalendarRoutingModule,
		LoginRoutingModule,
	],
	exports: [LoginComponent],
	providers: [AuthService],
})
export class AuthModule {}

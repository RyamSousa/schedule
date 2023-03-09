import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDividerModule } from "@angular/material/divider";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { CalendarModule } from "../calendar/calendar.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
	declarations: [UserDetailsComponent],
	imports: [
		CommonModule,
		RouterModule,
		CalendarModule,
		MatDividerModule,
		MatToolbarModule,
		MatSidenavModule,
		MatIconModule,
		MatButtonModule,
		MatFormFieldModule,
	],
	exports: [UserDetailsComponent],
})
export class UserDetailsModule {}

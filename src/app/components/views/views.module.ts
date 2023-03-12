import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalendarModule } from "./calendar/calendar.module";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { ViewsRoutingModule } from "./views-routing.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { UserModule } from "./user/user.module";

@NgModule({
	imports: [
		CommonModule,
		CalendarModule,
		RouterModule,
		ViewsRoutingModule,
		UserModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatOptionModule,
		MatSelectModule,
		MatToolbarModule,
		MatSidenavModule,
	],
})
export class ViewsModule {}

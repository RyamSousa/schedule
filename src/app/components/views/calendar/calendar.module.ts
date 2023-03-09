import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalendarComponent } from "./calendar.component";
import { CalendarRoutingModule } from "./calendar-routing.module";
import { FullCalendarModule } from "@fullcalendar/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { CalendarService } from "src/app/services/calendar-service.service";
import { DialogsModule } from "../dialogs/dialogs.module";

@NgModule({
	declarations: [CalendarComponent],
	imports: [
		CommonModule,
		CalendarRoutingModule,
		FullCalendarModule,
		ReactiveFormsModule,
		DialogsModule,
	],
	exports: [CalendarComponent],
	providers: [CalendarService],
})
export class CalendarModule {}

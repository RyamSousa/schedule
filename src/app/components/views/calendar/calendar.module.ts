import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalendarRoutingModule } from "./calendar-routing.module";
import { FullCalendarModule } from "@fullcalendar/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { CalendarService } from "src/app/services/calendar-service.service";
import { DialogsModule } from "../dialogs/dialogs.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CalendarDirective } from "src/app/directives/calendar.directive";
import { CalendarChildComponent } from "./calendar-child/calendar-child.component";
import { CalendarContainerComponent } from "./calendar-container/calendar-container.component";
import { EventService } from "src/app/services/event-service.service";
import { FormatTimeTextPipe } from "src/app/pipes/format-time-text.pipe";

@NgModule({
	declarations: [
		CalendarContainerComponent,
		CalendarChildComponent,
		CalendarDirective,
		FormatTimeTextPipe,
	],
	imports: [
		CommonModule,
		CalendarRoutingModule,
		FullCalendarModule,
		ReactiveFormsModule,
		DialogsModule,
		HttpClientModule,
	],
	exports: [CalendarContainerComponent],
	providers: [CalendarService, HttpClient, EventService],
})
export class CalendarModule {}

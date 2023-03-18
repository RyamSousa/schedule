import { Type } from "@angular/core";
import { CalendarChildComponent } from "./calendar-child.component";
import { CalendarOptions } from "@fullcalendar/core";

export class CalendarItem {
	constructor(
		public component: Type<CalendarChildComponent>,
		public calendarOptions: CalendarOptions
	) {}
}

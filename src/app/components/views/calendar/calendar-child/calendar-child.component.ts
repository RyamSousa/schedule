import { Component, Input } from "@angular/core";
import { CalendarOptions } from "@fullcalendar/core";

@Component({
	selector: "app-calendar-child",
	templateUrl: "./calendar-child.component.html",
	styleUrls: ["./calendar-child.component.scss"],
})
export class CalendarChildComponent {
	@Input() calendarOptions!: CalendarOptions;
}

import { ChangeDetectorRef, Component } from "@angular/core";
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import localePt from "@fullcalendar/core/locales/pt";
import { INITIAL_EVENTS } from "src/app/configs/event-utils";
import { MatDialog } from "@angular/material/dialog";
import { CreateEventComponent } from "../dialogs/create-event/create-event.component";

@Component({
	selector: "app-calendar",
	templateUrl: "./calendar.component.html",
	styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent {
	animal: string = "";
	name: string = "";
	calendarVisible = true;

	calendarOptions: CalendarOptions = {
		plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
		initialView: "timeGrid",
		titleFormat: { year: "numeric", month: "short", day: "numeric" },
		headerToolbar: {
			left: "today",
			center: "title",
			right: "prev,next",
		},
		locale: localePt,
		weekends: true,
		editable: true,
		selectable: true,
		selectMirror: true,
		dayMaxEvents: true,
		select: this.handleDateSelect.bind(this),
		eventClick: this.handleEventClick.bind(this),
		eventsSet: this.handleEvents.bind(this),
		longPressDelay: 20,
	};
	currentEvents: EventApi[] = [];

	constructor(private changeDetector: ChangeDetectorRef, public dialog: MatDialog) {}

	openDialog(): void {
		const dialogRef = this.dialog.open(CreateEventComponent, {
			data: { name: this.name, animal: this.animal },
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log("The dialog was closed", result);
			this.animal = result;
		});
	}

	handleCalendarToggle() {
		this.calendarVisible = !this.calendarVisible;
	}

	handleWeekendsToggle() {
		const { calendarOptions } = this;
		calendarOptions.weekends = !calendarOptions.weekends;
	}

	handleDateSelect(selectInfo: DateSelectArg) {
		this.openDialog();
		// const title = prompt("Please enter a new title for your event");
		// const calendarApi = selectInfo.view.calendar;
		// calendarApi.unselect(); // clear date selection
		// if (title) {
		// 	calendarApi.addEvent({
		// 		id: createEventId(),
		// 		title,
		// 		start: selectInfo.startStr,
		// 		end: selectInfo.endStr,
		// 		allDay: selectInfo.allDay,
		// 	});
		// }
	}

	handleEventClick(clickInfo: EventClickArg) {
		if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
			clickInfo.event.remove();
		}
	}

	handleEvents(events: EventApi[]) {
		this.currentEvents = events;
		this.changeDetector.detectChanges();
	}
}

import { ChangeDetectorRef, Component, OnInit, Input, ViewChild } from "@angular/core";
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import localePt from "@fullcalendar/core/locales/pt";
import { MatDialog } from "@angular/material/dialog";
import { CreateEventComponent } from "../dialogs/create-event/create-event.component";
import { CalendarService } from "src/app/services/calendar-service.service";
import { INITIAL_EVENTS } from "src/app/configs/event-utils";
import { ApiService } from "src/app/services/api-service.service";
import { ClientEvent, EventCalendar, OfficeTime, Service } from "src/app/temporary-utils/data";
import { isMobile } from "src/app/temporary-utils/functions";

@Component({
	selector: "app-calendar",
	templateUrl: "./calendar.component.html",
	styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
	@Input() optionalDialogEvent!: Function;
	@Input() selectable!: boolean;

	events: ClientEvent[] = [];
	services: Service[] = [];
	officeTime: OfficeTime = { maxOfficeTime: "", minOfficeTime: "" };
	eventsCalendar: EventCalendar[] = [];

	calendarOptions: CalendarOptions = {
		plugins: [interactionPlugin, timeGridPlugin],
		initialView: "timeGridWeek",
		titleFormat: { year: "numeric", month: "long", day: "2-digit" },
		headerToolbar: {
			left: "title",
			right: "today prev,next",
		},
		views: {
			timeGridFourDay: {
				type: "timeGrid",
				duration: { days: 4 },
			},
		},
		allDaySlot: false,
		locale: localePt,
		weekends: true,
		editable: false,
		selectable: true,
		initialEvents: INITIAL_EVENTS,
		selectMirror: true,
		dayMaxEvents: true,
		select: this.handleDateSelect.bind(this),
		eventClick: this.handleEventClick.bind(this),
		eventsSet: this.handleEvents.bind(this),
		longPressDelay: 10,
		contentHeight: "auto",
	};
	currentEvents: EventApi[] = [];

	constructor(
		private changeDetector: ChangeDetectorRef,
		private calendarService: CalendarService,
		private apiService: ApiService,
		private dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.events = this.apiService.getEvents();
		this.services = this.apiService.getServices();
		this.officeTime = this.apiService.getOfficeTime();
		this.events.forEach((e) =>
			this.eventsCalendar.push({
				title: e.service.name,
				start: e.service.start,
				end: e.service.end,
				backgroundColor: e.service.backgroundColor,
				extendedProps: {
					client: e.client,
					value: e.service.value,
					duration: e.service.duration,
				},
			})
		);

		this.setCalendarOptions();
	}

	openDialog(selectInfo: DateSelectArg): void {
		const dialogRef = this.dialog.open(CreateEventComponent, {
			data: this.services,
		});

		dialogRef.afterClosed().subscribe((formData) => {
			this.calendarService.addEvent(selectInfo, formData);
		});
	}

	handleWeekendsToggle() {
		const { calendarOptions } = this;
		calendarOptions.weekends = !calendarOptions.weekends;
	}

	handleDateSelect(selectInfo: DateSelectArg) {
		this.openDialog(selectInfo);
	}

	handleEventClick(clickInfo: EventClickArg) {
		if (!!this.optionalDialogEvent) {
			this.optionalDialogEvent(clickInfo);
		} else {
			if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
				clickInfo.event.remove();
			}
		}
	}

	handleEvents(events: EventApi[]) {
		this.currentEvents = events;
		this.changeDetector.detectChanges();
	}

	setCalendarOptions() {
		this.calendarOptions["slotMinTime"] = this.officeTime.minOfficeTime;
		this.calendarOptions["slotMaxTime"] = this.officeTime.maxOfficeTime;
		this.calendarOptions["initialEvents"] = this.eventsCalendar;

		if (this.selectable === undefined) {
			this.selectable = true;
		}

		this.calendarOptions["selectable"] = this.selectable;

		if (isMobile()) {
			this.calendarOptions["initialView"] = "timeGridFourDay";
			this.calendarOptions["headerToolbar"] = {
				right: "prev,next",
			};
		}
		console.log(this.calendarOptions["initialView"]);
	}
}

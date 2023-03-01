import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import localePt from "@fullcalendar/core/locales/pt";
import { MatDialog } from "@angular/material/dialog";
import { CreateEventComponent } from "../dialogs/create-event/create-event.component";
import { CalendarService } from "src/app/services/calendar-service.service";
import { INITIAL_EVENTS } from "src/app/configs/event-utils";
import { ApiService } from "src/app/services/api-service.service";
import { Service } from "src/app/temporary-utils/services";

@Component({
	selector: "app-calendar",
	templateUrl: "./calendar.component.html",
	styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
	services: Service[] = [];

	calendarVisible = true;

	calendarOptions: CalendarOptions = {
		plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
		initialView: "timeGridWeek",
		titleFormat: { year: "numeric", month: "long" },
		headerToolbar: {
			left: "title",
			right: "today prev,next",
		},
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
		longPressDelay: 20,
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
		this.services = this.apiService.getServices();
		this.calendarOptions["initialEvents"] = this.services;
		if (this.isMobile()) {
			this.calendarOptions["initialView"] = "timeGrid";
			this.calendarOptions["headerToolbar"] = {
				right: "prev,next",
			};
		}
	}

	openDialog(selectInfo: DateSelectArg): void {
		const dialogRef = this.dialog.open(CreateEventComponent, {
			data: this.services,
		});

		dialogRef.afterClosed().subscribe((service) => {
			try {
				this.calendarService.addEvent(selectInfo, service);
			} catch (error) {
				console.log(error);
			}
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
		this.openDialog(selectInfo);
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

	isMobile(): boolean {
		const width =
			window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		return width <= this.BREAKPOINTS.md.max;
	}

	BREAKPOINTS = {
		xs: { max: 425 },
		sm: { min: 426, max: 576 },
		md: { min: 577, max: 767 },
		lg: { min: 768, max: 1024 },
		xl: { min: 1025, max: 1440 },
		xxl: { min: 1441 },
	};
}

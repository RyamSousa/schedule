import { ChangeDetectorRef, Component, OnInit, Input, ViewChild } from "@angular/core";
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import localePt from "@fullcalendar/core/locales/pt";
import { MatDialog } from "@angular/material/dialog";
import { CalendarService } from "src/app/services/calendar-service.service";
import { INITIAL_EVENTS } from "src/app/configs/event-utils";
import { ApiService } from "src/app/services/api-service.service";
import { EventData, EventCalendar, OfficeTime, Service } from "src/app/temporary-utils/data";
import { isMobile } from "src/app/temporary-utils/functions";
import { CalendarDirective } from "src/app/directives/calendar.directive";
import { CalendarChildComponent } from "../calendar-child/calendar-child.component";
import { CalendarItem } from "../calendar-child/calendar-item";
import { CreateEventComponent } from "../../dialogs/create-event/create-event.component";

@Component({
	selector: "app-calendar-container",
	templateUrl: "./calendar-container.component.html",
	styleUrls: ["./calendar-container.component.scss"],
})
export class CalendarContainerComponent implements OnInit {
	@Input() optionalDialogEvent!: Function;
	@Input() selectable!: boolean;
	@Input() userId!: string;

	@ViewChild(CalendarDirective, { static: true }) calendarChild!: CalendarDirective;

	events: EventData[] = [];
	services: Service[] = [];
	officeTime!: OfficeTime;
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

	async ngOnInit() {
		await this.getEvents();
		this.loadCalendar();
		await this.getServices();
		//
		// User ID na linha abaixo
		//
		// this.apiService.getOfficeTime(1).subscribe((u) => (this.officeTime = u.officeTime));
	}

	loadCalendar() {
		const viewContainerRef = this.calendarChild.viewContainerRef;
		viewContainerRef.clear();

		let calendarItem = new CalendarItem(CalendarChildComponent, this.calendarOptions);
		const componentRef = viewContainerRef.createComponent<CalendarChildComponent>(
			calendarItem.component
		);

		componentRef.instance.calendarOptions = this.calendarOptions;
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

	async getEvents() {
		this.events = await this.apiService.getEvents();

		this.events.forEach((e) => {
			this.eventsCalendar.push({
				title: e.service.name,
				start: e.start,
				end: e.end,
				backgroundColor: e.service.color,
				extendedProps: {
					eventData: e,
				},
			});
		});

		await this.setCalendarOptions();
	}

	async setCalendarOptions() {
		this.officeTime = await (await this.apiService.getOfficeTime(1)).officeTime;
		console.log(this.officeTime);

		this.calendarOptions["slotMinTime"] = this.officeTime.minOfficeTime;
		this.calendarOptions["slotMaxTime"] = this.officeTime.maxOfficeTime;
		console.log(this.calendarOptions["slotMinTime"]);

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
	}

	async getServices() {
		this.services = await this.apiService.getServices();
	}
}

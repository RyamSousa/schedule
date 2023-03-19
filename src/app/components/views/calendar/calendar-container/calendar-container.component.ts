import { ChangeDetectorRef, Component, OnInit, Input, ViewChild } from "@angular/core";
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/core";

import { MatDialog } from "@angular/material/dialog";
import { CalendarService } from "src/app/services/calendar-service.service";
import { ApiService } from "src/app/services/api-service.service";
import { EventData, EventCalendar, OfficeTime, Service } from "src/app/temporary-utils/data";
import { isMobile } from "src/app/temporary-utils/functions";
import { CalendarDirective } from "src/app/directives/calendar.directive";
import { CalendarChildComponent } from "../calendar-child/calendar-child.component";
import { CalendarItem } from "../calendar-child/calendar-item";
import { CreateEventComponent } from "../../dialogs/create-event/create-event.component";
import { EventService } from "src/app/services/event-service.service";
import { calendarSettings } from "./calendar-tools";

@Component({
	selector: "app-calendar-container",
	templateUrl: "./calendar-container.component.html",
	styleUrls: ["./calendar-container.component.scss"],
})
export class CalendarContainerComponent implements OnInit {
	@ViewChild(CalendarDirective, { static: true }) calendarChild!: CalendarDirective;

	@Input() optionalDialogEvent!: Function;
	@Input() selectable!: boolean;
	@Input() userUuid: string = "fe99b6a6-0bf0-475c-b45e-45ba53f09580";

	calendarSettings: CalendarOptions = {};
	events: EventData[] = [];
	services: Service[] = [];
	officeTime!: OfficeTime;
	eventsCalendar: EventCalendar[] = [];
	currentEvents: EventApi[] = [];

	constructor(
		private changeDetector: ChangeDetectorRef,
		private calendarService: CalendarService,
		private apiService: ApiService,
		private eventService: EventService,
		private dialog: MatDialog
	) {}

	async ngOnInit() {
		let userData = await this.apiService.getOfficeTime(this.userUuid);
		this.officeTime = userData.officeTime;
		this.services = await this.apiService.getServices();
		await this.getEvents();
		await this.setCalendarOptions();
		this.loadCalendar();
	}

	loadCalendar() {
		const viewContainerRef = this.calendarChild.viewContainerRef;
		viewContainerRef.clear();

		let calendarItem = new CalendarItem(CalendarChildComponent, this.calendarSettings);
		const componentRef = viewContainerRef.createComponent<CalendarChildComponent>(
			calendarItem.component
		);

		componentRef.instance.calendarOptions = this.calendarSettings;
	}

	openDialog(selectInfo: DateSelectArg): void {
		const dialogRef = this.dialog.open(CreateEventComponent, {
			data: this.services,
		});

		dialogRef.afterClosed().subscribe((formData) => {
			this.calendarService.addEvent(selectInfo, formData, this.userUuid);
		});
	}

	handleWeekendsToggle() {
		const { calendarSettings: calendarOptions } = this;
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
		this.events = await this.eventService.findAll(this.userUuid);

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
	}

	async setCalendarOptions() {
		this.calendarSettings = calendarSettings;
		this.calendarSettings["slotMinTime"] = this.officeTime.minOfficeTime;
		this.calendarSettings["slotMaxTime"] = this.officeTime.maxOfficeTime;
		this.calendarSettings["initialEvents"] = this.eventsCalendar;
		this.calendarSettings["select"] = this.handleDateSelect.bind(this);
		this.calendarSettings["eventClick"] = this.handleEventClick.bind(this);
		this.calendarSettings["eventsSet"] = this.handleEvents.bind(this);

		if (this.selectable === undefined) {
			this.selectable = true;
		}
		this.calendarSettings["selectable"] = this.selectable;
		if (isMobile()) {
			this.calendarSettings["initialView"] = "timeGridFourDay";
			this.calendarSettings["headerToolbar"] = {
				right: "prev,next",
			};
		}
	}
}

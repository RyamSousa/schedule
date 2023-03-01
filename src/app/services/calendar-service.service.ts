import { DialogRef } from "@angular/cdk/dialog";
import { Injectable } from "@angular/core";
import { DateSelectArg } from "@fullcalendar/core";
import { Service } from "../components/views/calendar/calendar.component";
import { UserDataLogin } from "../models/user-data-login";

@Injectable({ providedIn: "platform" })
export class CalendarService {
	addEvent(selectInfo: DateSelectArg, data: Service) {
		const calendarApi = selectInfo.view.calendar;

		let result = this.canAddEvent(selectInfo);
		console.log(result);

		if (result) {
			calendarApi.unselect(); // clear date selection
			calendarApi.addEvent({
				id: "",
				title: data.name,
				start: selectInfo.startStr,
				end: selectInfo.endStr,
				allDay: selectInfo.allDay,
			});
		}
	}

	canAddEvent(selectInfo: DateSelectArg): boolean {
		const calendarApi = selectInfo.view.calendar;
		let events = calendarApi.getEvents();
		let allowed = true;

		events.forEach((event) => {
			let selectStart = new Date(selectInfo.startStr);
			let selectEnd = new Date(selectInfo.endStr);
			let actualStart = new Date((event?.start as unknown) as string);
			let actualEnd = new Date((event?.end as unknown) as string);
			let actualDay = actualStart.getDay();
			let selectedDay = actualStart.getDay();

			console.log(selectStart, selectEnd);
			console.log(actualStart, actualEnd);
			console.log(actualDay, selectedDay);
			if (selectedDay === actualDay) {
				// case 1: data com inicio fora e fim dentro do range
				if (
					selectStart < actualStart &&
					selectStart < actualEnd &&
					selectEnd > actualStart &&
					selectEnd < actualEnd
				) {
					allowed = false;
				}
				// case 2: data com inicio dentro e fim fora do range
				if (
					selectStart > actualStart &&
					selectStart < actualEnd &&
					selectEnd > actualStart &&
					selectEnd > actualEnd
				) {
					allowed = false;
				}
				// case 3: data com inicio e fim dentro do range
				if (
					selectStart > actualStart &&
					selectStart < actualEnd &&
					selectEnd > actualStart &&
					selectEnd < actualEnd
				) {
					allowed = false;
				}
				// case 4: data com inicio e fim fora do range, mas com outra danta dentro
				if (
					actualStart > selectStart &&
					actualStart < selectEnd &&
					actualEnd > selectStart &&
					actualEnd < selectEnd
				) {
					allowed = false;
				}
			}
		});

		return allowed;
	}
}

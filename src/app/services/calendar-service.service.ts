import { Injectable } from "@angular/core";
import { CalendarApi, DateSelectArg } from "@fullcalendar/core";
import * as moment from "moment";
import { Service } from "../temporary-utils/services";

@Injectable({ providedIn: "platform" })
export class CalendarService {
	addEvent(selectInfo: DateSelectArg, service: any) {
		let serviceFromDialog = service.service;
		const calendarApi = selectInfo.view.calendar;
		if (!this.validRangeEvent(selectInfo, calendarApi)) {
			throw new ErrorEvent("Já existe um serviço marcado neste horário");
		}

		this.validEventData(selectInfo, serviceFromDialog, calendarApi);
	}

	validRangeEvent(selectInfo: DateSelectArg, calendarApi: CalendarApi): boolean {
		let events = calendarApi.getEvents();
		let allowed = true;

		events.forEach((event) => {
			let selectStart = new Date(selectInfo.startStr);
			let selectEnd = new Date(selectInfo.endStr);
			let actualStart = new Date((event?.start as unknown) as string);
			let actualEnd = new Date((event?.end as unknown) as string);
			let actualDay = actualStart.getDay();
			let selectedDay = actualStart.getDay();

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

	validEventData(selectInfo: DateSelectArg, service: Service, calendarApi: CalendarApi) {
		console.log(service);
		console.log(selectInfo.start);
		console.log(moment(selectInfo.start).add(service.duration, "m").toDate());

		if (!!service) {
			//calendarApi.unselect();
			calendarApi.addEvent({
				id: "",
				title: service.title,
				start: selectInfo.start,
				end: moment(selectInfo.start).add(service.duration, "m").toDate(),
				backgroundColor: service.backgroundColor,
			});
		}
	}
}

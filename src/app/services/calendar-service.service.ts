import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CalendarApi, DateSelectArg } from "@fullcalendar/core";
import * as moment from "moment";
import { ErrorEventComponent } from "../components/views/dialogs/error-event/error-event.component";
import { FormData, Service } from "../temporary-utils/data";
import { ApiService } from "./api-service.service";

@Injectable({ providedIn: "platform" })
export class CalendarService {
	constructor(private apiService: ApiService, private dialog: MatDialog) {}

	addEvent(selectInfo: DateSelectArg, formdata: FormData) {
		if (!!formdata) {
			let serviceFromDialog = formdata.service;
			const calendarApi = selectInfo.view.calendar;

			selectInfo.end = moment(selectInfo.start).add(serviceFromDialog.duration, "m").toDate();

			if (!this.validRangeEvent(selectInfo, calendarApi)) {
				this.dialog.open(ErrorEventComponent, {
					data: "Já existe um serviço marcado neste horário",
				});
				return;
			}

			if (!!formdata.service && !!serviceFromDialog.name) {
				calendarApi.unselect();
				calendarApi.addEvent({
					id: "",
					title: serviceFromDialog.name,
					start: selectInfo.start,
					end: moment(selectInfo.start).add(serviceFromDialog.duration, "m").toDate(),
					backgroundColor: serviceFromDialog.backgroundColor,
					extendedProps: formdata,
				});
				this.apiService.addEvent({
					client: { name: formdata.name, phone: formdata.phone },
					service: formdata.service,
				});
			}
		}
	}

	validRangeEvent(selectInfo: DateSelectArg, calendarApi: CalendarApi): boolean {
		let events = calendarApi.getEvents();
		let allowed = true;

		events.forEach((event) => {
			let selectStart = new Date(selectInfo.start);
			let selectEnd = new Date(selectInfo.end);
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

				// case 5: data com inicio fora e fim igual ao final do range
				if (
					selectStart < actualStart &&
					selectStart < actualEnd &&
					selectEnd > actualStart &&
					selectEnd.getDate() === actualEnd.getDate()
				) {
					allowed = false;
				}
			}
		});

		return allowed;
	}
}

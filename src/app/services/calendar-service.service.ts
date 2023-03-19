import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CalendarApi, DateSelectArg } from "@fullcalendar/core";
import * as moment from "moment";
import { ErrorEventComponent } from "../components/views/dialogs/error-event/error-event.component";
import { FormData } from "../temporary-utils/data";
import { validRangeEvent } from "../temporary-utils/functions";
import { ApiService } from "./api-service.service";
import { EventService } from "./event-service.service";

@Injectable()
export class CalendarService {
	constructor(private dialog: MatDialog, private eventService: EventService) {}

	addEvent(selectInfo: DateSelectArg, formdata: FormData) {
		if (!!formdata) {
			let serviceFromDialog = formdata.service;
			const calendarApi = selectInfo.view.calendar;

			selectInfo.end = moment(selectInfo.start).add(serviceFromDialog.duration, "m").toDate();

			if (!validRangeEvent(selectInfo, calendarApi)) {
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
					backgroundColor: serviceFromDialog.color,
					extendedProps: formdata,
				});

				// this.apiService.addEvent({
				// 	uuid: "",
				// 	clientName: formdata.name,
				// 	clientPhone: formdata.phone,
				// 	service: formdata.service,
				// 	start: selectInfo.start.toISOString(),
				// 	end: moment(selectInfo.start)
				// 		.add(serviceFromDialog.duration, "m")
				// 		.toDate()
				// 		.toISOString(),
				// });

				this.eventService.insert({
					uuid: "uuuiiiddass",
					clientName: formdata.name,
					clientPhone: formdata.phone,
					service: formdata.service,
					start: selectInfo.start.toISOString(),
					end: moment(selectInfo.start)
						.add(serviceFromDialog.duration, "m")
						.toDate()
						.toISOString(),
				});
			}
		}
	}
}

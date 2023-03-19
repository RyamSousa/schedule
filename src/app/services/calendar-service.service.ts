import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CalendarApi, DateSelectArg } from "@fullcalendar/core";
import * as moment from "moment";
import { ErrorEventComponent } from "../components/views/dialogs/error-event/error-event.component";
import { FormData } from "../temporary-utils/data";
import { generateUUid, validRangeEvent } from "../temporary-utils/functions";
import { EventService } from "./event-service.service";

@Injectable()
export class CalendarService {
	constructor(private dialog: MatDialog, private eventService: EventService) {}

	async addEvent(selectInfo: DateSelectArg, formdata: FormData, userUuid: string) {
		if (!!formdata) {
			let serviceFromDialog = formdata.service;
			const calendarApi = selectInfo.view.calendar;
			let endDate = moment(selectInfo.start).add(serviceFromDialog.duration, "m").toDate();

			if (!validRangeEvent(selectInfo, calendarApi)) {
				this.dialog.open(ErrorEventComponent, {
					data: "Já existe um serviço marcado neste horário",
				});
				return;
			}

			if (!!formdata.service && !!serviceFromDialog.name) {
				try {
					await this.eventService.insert({
						uuid: generateUUid(),
						uuidUser: userUuid,
						clientName: formdata.name,
						clientPhone: formdata.phone,
						service: formdata.service,
						start: selectInfo.start.toISOString(),
						end: endDate.toISOString(),
					});

					calendarApi.unselect();
					calendarApi.addEvent({
						title: serviceFromDialog.name,
						start: selectInfo.start,
						end: endDate,
						backgroundColor: serviceFromDialog.color,
						extendedProps: formdata,
					});
				} catch (error) {
					throw new Error();
				}
			}
		}
	}
}

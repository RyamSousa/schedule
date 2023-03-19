import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EventData, Service } from "src/app/temporary-utils/data";

@Component({
	selector: "app-view-event-details",
	templateUrl: "./view-event-details.component.html",
	styleUrls: ["./view-event-details.component.scss"],
})
export class ViewEventDetailsComponent implements OnInit {
	event!: EventData;
	service!: Service;

	constructor(
		private dialogRef: MatDialogRef<ViewEventDetailsComponent>,
		@Inject(MAT_DIALOG_DATA) public eventData: any
	) {}

	ngOnInit(): void {
		console.log(this.eventData.extendedProps);
		console.log(this.eventData);

		this.event = this.extendedPropsToEvent(this.eventData.extendedProps);

		this.service = {
			name: this.event.service.name,
			uuid: this.event.service.uuid,
			color: this.event.service.color,
			duration: this.event.service.duration,
			value: this.event.service.value,
		};
	}

	extendedPropsToEvent(extendedProps: any): EventData {
		this.event = {
			clientName: extendedProps.eventData.clientName,
			clientPhone: extendedProps.eventData.clientPhone,
			start: extendedProps.eventData.start,
			end: extendedProps.eventData.end,
			service: extendedProps.eventData.service,
			uuid: extendedProps.eventData.uuid,
		};

		return this.event;
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	cancelSchedule() {
		// open dialog notify client
		// delete event

		this.dialogRef.close();
	}
}

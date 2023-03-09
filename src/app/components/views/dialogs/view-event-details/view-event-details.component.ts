import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ClientData, Service } from "src/app/temporary-utils/data";

@Component({
	selector: "app-view-event-details",
	templateUrl: "./view-event-details.component.html",
	styleUrls: ["./view-event-details.component.scss"],
})
export class ViewEventDetailsComponent implements OnInit {
	client!: ClientData;
	service!: Service;

	constructor(
		private dialogRef: MatDialogRef<ViewEventDetailsComponent>,
		@Inject(MAT_DIALOG_DATA) public eventData: any
	) {}

	ngOnInit(): void {
		this.client = this.eventData.extendedProps.client;
		this.service = {
			title: this.eventData.title,
			backgroundColor: this.eventData.backgroundColor,
			duration: this.eventData.extendedProps.duration,
			value: this.eventData.extendedProps.value,
			start: this.eventData._instance.range.start,
			end: this.eventData._instance.range.end,
		};
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

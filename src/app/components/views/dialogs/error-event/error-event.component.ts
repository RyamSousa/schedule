import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
	selector: "app-error-event",
	templateUrl: "./error-event.component.html",
	styleUrls: ["./error-event.component.scss"],
})
export class ErrorEventComponent implements OnInit {
	message: string = "";

	constructor(
		private dialogRef: MatDialogRef<ErrorEventComponent>,
		@Inject(MAT_DIALOG_DATA) public data: string
	) {}

	ngOnInit(): void {
		this.message = this.data;
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}

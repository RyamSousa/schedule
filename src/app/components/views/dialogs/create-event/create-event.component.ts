import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface DialogData {
	animal: string;
	name: string;
}

@Component({
	selector: "app-create-event",
	templateUrl: "./create-event.component.html",
	styleUrls: ["./create-event.component.scss"],
})
export class CreateEventComponent {
	constructor(
		public dialogRef: MatDialogRef<CreateEventComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {}

	onNoClick(): void {
		this.dialogRef.close();
	}
}

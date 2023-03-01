import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Service } from "../../calendar/calendar.component";

@Component({
	selector: "app-create-event",
	templateUrl: "./create-event.component.html",
	styleUrls: ["./create-event.component.scss"],
})
export class CreateEventComponent implements OnInit {
	form!: FormGroup;

	constructor(
		private dialogRef: MatDialogRef<CreateEventComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Service
	) {}

	ngOnInit(): void {
		this.form = new FormGroup({
			name: new FormControl("", Validators.required),
		});
	}

	save() {
		this.dialogRef.close(this.form?.value);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}

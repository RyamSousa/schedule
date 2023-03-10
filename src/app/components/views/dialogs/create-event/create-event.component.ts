import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Service } from "src/app/temporary-utils/data";

@Component({
	selector: "app-create-event",
	templateUrl: "./create-event.component.html",
	styleUrls: ["./create-event.component.scss"],
})
export class CreateEventComponent implements OnInit {
	form!: FormGroup;

	constructor(
		private dialogRef: MatDialogRef<CreateEventComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Service[]
	) {}

	ngOnInit(): void {
		this.form = new FormGroup({
			name: new FormControl("", [Validators.required, Validators.maxLength(50)]),
			phone: new FormControl("", [Validators.required, Validators.maxLength(11)]),
			service: new FormControl({}, Validators.required),
		});
	}

	save() {
		this.dialogRef.close(this.form?.value);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}

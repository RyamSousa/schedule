import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Service } from "src/app/temporary-utils/data";

@Component({
	selector: "app-create-service",
	templateUrl: "./create-service.component.html",
	styleUrls: ["./create-service.component.scss"],
})
export class CreateServiceComponent implements OnInit {
	form!: FormGroup;

	constructor(private dialogRef: MatDialogRef<CreateServiceComponent>) {}

	ngOnInit(): void {
		this.form = new FormGroup({
			name: new FormControl("", [Validators.required, Validators.maxLength(50)]),
			value: new FormControl(0, [Validators.required, Validators.maxLength(8)]),
			duration: new FormControl(0, [Validators.required, Validators.maxLength(6)]),
			backgroundColor: new FormControl("", Validators.required),
		});
	}

	save() {
		this.dialogRef.close(this.form?.value);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}

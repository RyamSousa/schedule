import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, AbstractControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Service } from "src/app/temporary-utils/data";
import { ThemePalette } from "@angular/material/core";

@Component({
	selector: "app-create-service",
	templateUrl: "./create-service.component.html",
	styleUrls: ["./create-service.component.scss"],
})
export class CreateServiceComponent implements OnInit {
	form!: FormGroup;
	color: ThemePalette = "primary";

	constructor(
		private dialogRef: MatDialogRef<CreateServiceComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Service
	) {}

	ngOnInit(): void {
		this.form = new FormGroup({
			name: new FormControl(this.data?.name ? this.data.name : "", [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(50),
			]),
			value: new FormControl(this.data?.value ? this.data.value : 0, [
				Validators.required,
				Validators.maxLength(8),
			]),
			duration: new FormControl(this.data?.duration ? this.data.duration : 0, [
				Validators.required,
				Validators.maxLength(3),
			]),
			backgroundColor: new FormControl(
				this.data?.backgroundColor ? this.data.backgroundColor : "",
				Validators.required
			),
		});
	}

	save() {
		this.dialogRef.close(this.form?.value);
	}

	deleteService() {
		this.dialogRef.close(this.data);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}

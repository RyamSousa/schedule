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
	lockButtonSave: boolean = true;
	isAble = true;

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

		this.form.valueChanges.subscribe(() => {
			if (this.form.valid) {
				this.lockButtonSave = false;
			}
		});
	}

	save() {
		if (this.form.valid) {
			this.dialogRef.close(this.form.value);
		} else {
			this.dialogRef.close();
		}
	}

	deleteService() {
		if (this.form.valid) {
			this.dialogRef.close(this.data);
		} else {
			this.dialogRef.close();
		}
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}

import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ApiService } from "src/app/services/api-service.service";
import { Service } from "src/app/temporary-utils/data";
import { isMobile } from "src/app/temporary-utils/functions";
import { CreateServiceComponent } from "../views/dialogs/create-service/create-service.component";

@Component({
	selector: "app-service-table",
	templateUrl: "./service-table.component.html",
	styleUrls: ["./service-table.component.scss"],
})
export class ServiceTableComponent implements OnInit {
	clickedRows = new Set<Service>();
	displayedColumns: string[] = ["name", "duration", "value", "background-color"];
	dataSource = new MatTableDataSource<Service>();
	selection = new SelectionModel<Service>(true, []);

	services!: Service[];

	constructor(private dialog: MatDialog, private api: ApiService) {}

	async ngOnInit() {
		this.services = await this.api.getServices();
		this.dataSource = new MatTableDataSource<Service>(this.services);
	}

	openDialogCreateService(data?: Service): MatDialogRef<CreateServiceComponent> {
		return this.dialog.open(CreateServiceComponent, {
			data: data,
		});
	}

	clickedRow(row: Service) {
		const dialogRef = this.openDialogCreateService(row);

		dialogRef.afterClosed().subscribe((formData) => {
			console.log(formData.id);
			if (formData?.id) {
				this.api.deleteService(formData);
			}
		});
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	toggleAllRows() {
		if (this.isAllSelected()) {
			this.selection.clear();
			return;
		}

		this.selection.select(...this.dataSource.data);
	}

	checkboxLabel(row?: Service): string {
		if (!row) {
			return `${this.isAllSelected() ? "deselect" : "select"} all`;
		}
		return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row.duration + 1}`;
	}

	isMobile() {
		return isMobile();
	}

	async addService() {
		const dialogRef = this.openDialogCreateService();

		dialogRef.afterClosed().subscribe((formData) => {
			console.log(formData);

			if (formData) {
				formData.backgroundColor = `#${formData?.backgroundColor.hex}`;
				this.api.addService(formData);
			}
		});
		await this.api.getServices();
		this.dataSource = new MatTableDataSource<Service>();
	}
}

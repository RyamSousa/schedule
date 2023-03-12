import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { isMobile } from "src/app/temporary-utils/functions";
import { Service } from "src/app/temporary-utils/data";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CreateServiceComponent } from "../../dialogs/create-service/create-service.component";
import { ApiService } from "src/app/services/api-service.service";

@Component({
	selector: "app-user-services",
	templateUrl: "./user-services.component.html",
	styleUrls: ["./user-services.component.scss"],
})
export class UserServicesComponent implements OnInit {
	clickedRows = new Set<Service>();
	displayedColumns: string[] = ["name", "duration", "value", "background-color"];
	dataSource = new MatTableDataSource<Service>();
	selection = new SelectionModel<Service>(true, []);

	constructor(private dialog: MatDialog, private api: ApiService) {}
	ngOnInit(): void {
		this.dataSource = new MatTableDataSource<Service>(this.api.getServices());
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

	clickedRow(row: Service) {
		const dialogRef = this.openDialogCreateService(row);

		dialogRef.afterClosed().subscribe((formData) => {
			console.log(formData.id);
			if (formData?.id) {
				this.api.deleteService(formData);
			}
		});
	}

	openDialogCreateService(data?: Service): MatDialogRef<CreateServiceComponent> {
		return this.dialog.open(CreateServiceComponent, {
			data: data,
		});
	}

	addService() {
		const dialogRef = this.openDialogCreateService();

		dialogRef.afterClosed().subscribe((formData) => {
			this.api.deleteService(formData);
		});

		this.dataSource = new MatTableDataSource<Service>(this.api.getServices());
	}
}

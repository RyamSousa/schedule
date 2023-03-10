import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { isMobile } from "src/app/configs/mobile-check";
import { Service } from "src/app/temporary-utils/data";

const TODAY_STR = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

const ELEMENT_DATA = [
	{
		name: "Alisamento progressivo",
		duration: 50,
		value: 50,
		start: TODAY_STR + "T10:00:00",
		end: TODAY_STR + "T10:50:00",
		backgroundColor: "#ff8000",
	},
	{
		name: "Manicure",
		duration: 30,
		value: 50,
		start: TODAY_STR + "T07:00:00",
		end: TODAY_STR + "T07:50:00",
		backgroundColor: "#0066cc",
	},
];

@Component({
	selector: "app-user-services",
	templateUrl: "./user-services.component.html",
	styleUrls: ["./user-services.component.scss"],
})
export class UserServicesComponent implements OnInit {
	clickedRows = new Set<{}>();
	displayedColumns: string[] = ["name", "duration", "value", "background-color"];
	dataSource = new MatTableDataSource<{}>();
	selection = new SelectionModel<{}>(true, []);

	ngOnInit(): void {
		this.dataSource = new MatTableDataSource<{}>(ELEMENT_DATA);
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

	clickedRow(row: any, event?: any) {
		console.log(row);
	}
}

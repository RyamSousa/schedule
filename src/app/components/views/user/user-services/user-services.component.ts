import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { isMobile } from "src/app/temporary-utils/functions";
import { Service } from "src/app/temporary-utils/data";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CreateServiceComponent } from "../../dialogs/create-service/create-service.component";

@Component({
	selector: "app-user-services",
	templateUrl: "./user-services.component.html",
	styleUrls: ["./user-services.component.scss"],
})
export class UserServicesComponent {}

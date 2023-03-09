import { Component, ViewChild, OnInit } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver } from "@angular/cdk/layout";
import { MatDialog } from "@angular/material/dialog";
import { ErrorEventComponent } from "../../dialogs/error-event/error-event.component";
import { ViewEventDetailsComponent } from "../../dialogs/view-event-details/view-event-details.component";
import { Service } from "src/app/temporary-utils/data";
import { ApiService } from "src/app/services/api-service.service";

@Component({
	selector: "app-user-details",
	templateUrl: "./user-details.component.html",
	styleUrls: ["./user-details.component.scss"],
})
export class UserDetailsComponent implements OnInit {
	@ViewChild(MatSidenav)
	sidenav!: MatSidenav;
	services: Service[] = [];

	constructor(
		private observer: BreakpointObserver,
		private dialog: MatDialog,
		private apiService: ApiService
	) {}

	ngOnInit(): void {
		this.apiService.getServices();
	}

	ngAfterViewInit() {
		this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
			if (res.matches) {
				this.sidenav.mode = "over";
				this.sidenav.close();
			} else {
				this.sidenav.mode = "side";
				this.sidenav.open();
			}
		});
	}

	openDialogCalendar(): void {
		const dialogRef = this.dialog.open(ErrorEventComponent);
	}

	openDialogEvent(clickInfo: any): void {
		console.log(clickInfo.event);

		const dialogRef = this.dialog.open(ViewEventDetailsComponent, {
			data: clickInfo.event,
		});
	}
}

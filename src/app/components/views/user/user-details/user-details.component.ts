import { Component, ViewChild, OnInit } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver } from "@angular/cdk/layout";
import { MatDialog } from "@angular/material/dialog";
import { ViewEventDetailsComponent } from "../../dialogs/view-event-details/view-event-details.component";
import { Service } from "src/app/temporary-utils/data";
import { ApiService } from "src/app/services/api-service.service";
import { isMobile } from "src/app/temporary-utils/functions";

@Component({
	selector: "app-user-details",
	templateUrl: "./user-details.component.html",
	styleUrls: ["./user-details.component.scss"],
})
export class UserDetailsComponent implements OnInit {
	@ViewChild(MatSidenav)
	sidenav!: MatSidenav;
	services: Service[] = [];

	openPageService: boolean = false;
	selectable: boolean = false;

	constructor(
		private observer: BreakpointObserver,
		private dialog: MatDialog,
		private apiService: ApiService
	) {}

	ngOnInit(): void {
		this.apiService.getServices();
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
				if (res.matches) {
					this.sidenav.mode = "over";
					this.sidenav.close();
				} else {
					this.sidenav.mode = "side";
					this.sidenav.open();
				}
			});
		}, 1);
	}

	openDialogEvent(clickInfo: any): void {
		const dialogRef = this.dialog.open(ViewEventDetailsComponent, {
			data: clickInfo.event,
		});
	}

	navigate(page: string) {
		if (page === "") {
			this.openPageService = true;
		} else {
			window.location.pathname = page;
		}
	}

	isMobile() {
		return isMobile();
	}
}

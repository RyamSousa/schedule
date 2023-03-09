import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatOptionModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { DialogRef } from "@angular/cdk/dialog";
import { CalendarService } from "src/app/services/calendar-service.service";
import { NgxMaskModule } from "ngx-mask";
import { CreateEventComponent } from "./create-event/create-event.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ErrorEventComponent } from "./error-event/error-event.component";
import { ViewEventDetailsComponent } from "./view-event-details/view-event-details.component";

@NgModule({
	declarations: [CreateEventComponent, ErrorEventComponent, ViewEventDetailsComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatDialogModule,
		MatButtonModule,
		MatInputModule,
		MatSelectModule,
		MatOptionModule,
		NgxMaskModule.forRoot(),
	],
	providers: [
		{
			provide: DialogRef,
			useValue: {},
		},
		{
			provide: MAT_DIALOG_DATA,
			useValue: {},
		},
		CalendarService,
	],
})
export class DialogsModule {}

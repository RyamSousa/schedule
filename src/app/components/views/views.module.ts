import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatOptionModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { BrowserModule } from "@angular/platform-browser";
import { MatButtonModule } from "@angular/material/button";
import { CreateEventComponent } from "./dialogs/create-event/create-event.component";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { CalendarComponent } from "./calendar/calendar.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { DialogRef } from "@angular/cdk/dialog";
import { ErrorEventComponent } from "./dialogs/error-event/error-event.component";
import { CalendarService } from "src/app/services/calendar-service.service";

@NgModule({
	declarations: [CalendarComponent, CreateEventComponent, ErrorEventComponent],
	imports: [
		CommonModule,
		FullCalendarModule,
		BrowserModule,
		MatFormFieldModule,
		FormsModule,
		MatOptionModule,
		MatIconModule,
		MatInputModule,
		MatButtonModule,
		MatDialogModule,
		MatSelectModule,
		MatOptionModule,
		ReactiveFormsModule,
	],
	exports: [CreateEventComponent, CalendarComponent, MatDialogModule, ErrorEventComponent],
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
export class ViewsModule {}

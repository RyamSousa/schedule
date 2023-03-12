import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendarComponent } from "./components/views/calendar/calendar.component";

const routes: Routes = [
	{
		path: "",
		redirectTo: "schedule",
		pathMatch: "full",
	},
	{
		path: "schedule",
		component: CalendarComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

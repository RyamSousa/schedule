import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendarContainerComponent } from "./components/views/calendar/calendar-container/calendar-container.component";

const routes: Routes = [
	{
		path: "",
		redirectTo: "schedule",
		pathMatch: "full",
	},
	{
		path: "schedule",
		component: CalendarContainerComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendarComponent } from "../calendar/calendar.component";
import { UserDetailsComponent } from "./user-details/user-details.component";

const routes: Routes = [
	{
		path: "",
		component: UserDetailsComponent,
	},
	{
		path: "user-informations",
		component: CalendarComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserDetailsRoutingModule {}

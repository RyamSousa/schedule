import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendarComponent } from "./calendar/calendar.component";
import { UserDetailsRoutingModule } from "./user/user-details-routing.module";
import { UserDetailsComponent } from "./user/user-details/user-details.component";

const routes: Routes = [
	{
		path: "user",
		component: UserDetailsComponent,
		loadChildren: () => UserDetailsRoutingModule,
	},
	{ path: "calendar", component: CalendarComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ViewsRoutingModule {}

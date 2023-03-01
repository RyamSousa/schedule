import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/auth/login/login.component";
import { CalendarComponent } from "./components/views/calendar/calendar.component";

const routes: Routes = [
	{
		path: "",
		component: CalendarComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

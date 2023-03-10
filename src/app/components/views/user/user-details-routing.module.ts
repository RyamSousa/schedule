import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserServicesComponent } from "./user-services/user-services.component";

const routes: Routes = [
	{
		path: "",
		redirectTo: "schedules",
		pathMatch: "full",
	},
	{
		path: "services",
		component: UserServicesComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserDetailsRoutingModule {}

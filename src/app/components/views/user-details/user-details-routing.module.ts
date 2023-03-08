import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserDetailsComponent } from "./user-details.component";

const routes: Routes = [{ path: "user", component: UserDetailsComponent }];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class UserDetailsRoutingModule {}

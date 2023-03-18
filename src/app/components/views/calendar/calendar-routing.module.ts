import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendarContainerComponent } from "./calendar-container/calendar-container.component";

const routes: Routes = [{ path: "", component: CalendarContainerComponent }];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class CalendarRoutingModule {}

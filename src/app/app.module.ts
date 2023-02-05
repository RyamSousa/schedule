import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthModule } from "./components/auth/auth.module";
import { ViewsModule } from "./components/views/views.module";
import { DialogRef } from "@angular/cdk/dialog";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MatDialogModule,
		BrowserAnimationsModule,
		AuthModule,
		ViewsModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}

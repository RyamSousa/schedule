import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthModule } from "./components/auth/auth.module";
import { ViewsModule } from "./components/views/views.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireModule } from "@angular/fire/compat/";
import { environment } from "src/environments/environment";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MatDialogModule,
		BrowserAnimationsModule,
		AuthModule,
		ViewsModule,
		MatFormFieldModule,
		AngularFirestoreModule,
		AngularFirestoreModule.enablePersistence(),
		AngularFireModule.initializeApp(environment.firebaseConfig),
	],
	bootstrap: [AppComponent],
})
export class AppModule {}

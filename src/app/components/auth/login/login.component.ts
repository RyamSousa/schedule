import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth-service.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
	hide: boolean = true;
	email = new FormControl("", [Validators.required]);
	password = new FormControl("", [Validators.required]);

	constructor(private authService: AuthService, private router: Router) {}

	login() {
		const isValid = this.authService.login({
			email: this.email.value ? this.email.value : "",
			password: this.password.value ? this.password.value : "",
		});

		if (isValid) {
			this.router.navigate(["calendar"]);
		}
	}
}

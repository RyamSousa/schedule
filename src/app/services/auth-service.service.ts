import { Injectable } from "@angular/core";
import { UserData } from "../models/user-data";
import { UserDataLogin } from "../models/user-data-login";

@Injectable()
export class AuthService {
	constructor() {}

	login(userData: UserDataLogin) {
		return true;
	}
}

import { UserDataLogin } from "./user-data-login";

export interface UserData {
	full_name: string;
	login: UserDataLogin;
	services?: {};
}

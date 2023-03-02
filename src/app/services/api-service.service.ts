import { Injectable } from "@angular/core";
import "../temporary-utils/data";
import { OfficeTime, Service, UserData } from "../temporary-utils/data";

const TODAY_STR = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

const SERVICES: Service[] = [
	{
		title: "Manicure",
		value: 50,
		duration: 60,
		start: TODAY_STR + "T07:00:00",
		end: TODAY_STR + "T07:50:00",
		backgroundColor: "#0066cc",
	},
	{
		title: "Sobrancelha",
		value: 12,
		duration: 30,
		start: TODAY_STR + "T08:00:00",
		end: TODAY_STR + "T08:30:00",
		backgroundColor: "#ffc34d",
	},
	{
		title: "Corte de Cabelo",
		value: 20,
		duration: 40,
		start: TODAY_STR + "T08:40:00",
		end: TODAY_STR + "T09:20:00",
		backgroundColor: "#ff3333",
	},
	{
		title: "Alisamento progressivo",
		value: 50,
		duration: 120,
		start: TODAY_STR + "T09:20:00",
		end: TODAY_STR + "T11:00:00",
		backgroundColor: "#ff8000",
	},
];

const USER_DATA: UserData = {
	officeTime: {
		minOfficeTime: "07:00",
		maxOfficeTime: "18:00",
	},
	services: SERVICES,
};

@Injectable({ providedIn: "platform" })
export class ApiService {
	services: Service[] = [];
	officeTime: OfficeTime = { maxOfficeTime: "", minOfficeTime: "" };

	constructor() {
		this.officeTime = USER_DATA.officeTime;
		this.services = USER_DATA.services;
	}

	getServices(): Service[] {
		return this.services;
	}

	addService(service: Service) {
		this.services.push(service);
	}

	getOfficeTime() {
		return this.officeTime;
	}
}

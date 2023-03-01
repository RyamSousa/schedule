import { Injectable } from "@angular/core";
import "../temporary-utils/services";
import { Service } from "../temporary-utils/services";

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
		title: "Cabelo e Barba",
		value: 12,
		duration: 30,
		start: TODAY_STR + "T15:00:00",
		end: TODAY_STR + "T15:30:00",
		backgroundColor: "#ffc34d",
	},
	{
		title: "Sobrancelha",
		value: 20,
		duration: 40,
		start: TODAY_STR + "T08:40:00",
		end: TODAY_STR + "T09:20:00",
		backgroundColor: "#ff3333",
	},
];

@Injectable({ providedIn: "platform" })
export class ApiService {
	constructor() {}

	getServices(): Service[] {
		return SERVICES;
	}
}

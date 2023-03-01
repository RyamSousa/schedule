import { Injectable } from "@angular/core";
import "../temporary-utils/services";
import { Services } from "../temporary-utils/services";

const TODAY_STR = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

const SERVICES: Services[] = [
	{
		title: "Manicure",
		value: 50,
		duration: "01:00",
		start: TODAY_STR + "T07:00:00",
		end: TODAY_STR + "T07:50:00",
		backgroundColor: "#0066cc",
	},
	{
		title: "Sobrancelha",
		value: 12,
		duration: "00:30",
		start: TODAY_STR + "T08:00:00",
		end: TODAY_STR + "T08:30:00",
		backgroundColor: "#ffc34d",
	},
	{
		title: "Cabelo",
		value: 20,
		duration: "00:40",
		start: TODAY_STR + "T08:40:00",
		end: TODAY_STR + "T09:20:00",
		backgroundColor: "#ff3333",
	},
];

@Injectable({ providedIn: "platform" })
export class ApiService {
	constructor() {}

	getServices(): Services[] {
		return SERVICES;
	}
}

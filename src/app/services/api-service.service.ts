import { Injectable } from "@angular/core";
import "../temporary-utils/data";
import { ClientEvent, OfficeTime, Service, UserData } from "../temporary-utils/data";

const TODAY_STR = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

const SERVICES: Service[] = [
	{
		name: "Manicure",
		duration: "T00:50:00",
		value: 50,
		start: TODAY_STR + "T07:00:00",
		end: TODAY_STR + "T07:50:00",
		backgroundColor: "#0066cc",
	},
	{
		name: "Sobrancelha",
		duration: "T00:30:00",
		value: 50,
		start: TODAY_STR + "T08:00:00",
		end: TODAY_STR + "T08:30:00",
		backgroundColor: "#ffc34d",
	},
	{
		name: "Corte de Cabelo",
		duration: "T00:40:00",
		value: 50,
		start: TODAY_STR + "T08:40:00",
		end: TODAY_STR + "T09:20:00",
		backgroundColor: "#ff3333",
	},
	{
		name: "Alisamento progressivo",
		duration: "T00:50:00",
		value: 50,
		start: TODAY_STR + "T10:00:00",
		end: TODAY_STR + "T10:50:00",
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

const CLIENT_EVENT: ClientEvent[] = [
	{
		client: {
			name: "Astro Gilson",
			phone: "11999562347",
		},
		service: {
			name: "Alisamento progressivo",
			duration: "T00:50:00",
			value: 50,
			start: TODAY_STR + "T09:20:00",
			end: TODAY_STR + "T10:10:00",
			backgroundColor: "#ff8000",
		},
	},
	{
		client: {
			name: "Gilson Astro",
			phone: "11999562347",
		},
		service: {
			name: "Corte de Cabelo",
			duration: "T00:40:00",
			value: 50,
			start: TODAY_STR + "T08:40:00",
			end: TODAY_STR + "T09:20:00",
			backgroundColor: "#ff3333",
		},
	},
	{
		client: {
			name: "Dada Vernek",
			phone: "11999562347",
		},
		service: {
			name: "Manicure",
			duration: "T00:50:00",
			value: 50,
			start: TODAY_STR + "T07:00:00",
			end: TODAY_STR + "T07:50:00",
			backgroundColor: "#0066cc",
		},
	},
	{
		client: {
			name: "Johsons Baybi",
			phone: "11999562347",
		},
		service: {
			name: "Sobrancelha",
			duration: "T00:30:00",
			value: 50,
			start: TODAY_STR + "T08:00:00",
			end: TODAY_STR + "T08:30:00",
			backgroundColor: "#ffc34d",
		},
	},
];

@Injectable({ providedIn: "platform" })
export class ApiService {
	services: Service[] = [];
	clientEvents: ClientEvent[] = [];
	officeTime: OfficeTime = { maxOfficeTime: "", minOfficeTime: "" };

	constructor() {
		this.officeTime = USER_DATA.officeTime;
		this.services = USER_DATA.services;
		this.clientEvents = CLIENT_EVENT;
	}

	getEvents(): ClientEvent[] {
		return this.clientEvents;
	}

	addEvent(clentEvent: ClientEvent) {
		this.clientEvents.push(clentEvent);
		console.log(this.clientEvents);
	}

	getServices(): Service[] {
		return this.services;
	}

	addService(service: Service) {
		this.services.push(service);
	}

	addSchedule() {}

	getOfficeTime() {
		return this.officeTime;
	}
}

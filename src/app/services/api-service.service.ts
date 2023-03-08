import { Injectable } from "@angular/core";
import "../temporary-utils/data";
import { ClientEvent, OfficeTime, Service, UserData } from "../temporary-utils/data";

const TODAY_STR = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

const SERVICES: Service[] = [
	{
		title: "Manicure",
		duration: 50,
		value: 50,
		start: TODAY_STR + "T07:00:00",
		end: TODAY_STR + "T07:50:00",
		backgroundColor: "#0066cc",
	},
	{
		title: "Sobrancelha",
		duration: 30,
		value: 50,
		start: TODAY_STR + "T08:00:00",
		end: TODAY_STR + "T08:30:00",
		backgroundColor: "#ffc34d",
	},
	{
		title: "Corte de Cabelo",
		duration: 40,
		value: 50,
		start: TODAY_STR + "T08:40:00",
		end: TODAY_STR + "T09:20:00",
		backgroundColor: "#ff3333",
	},
	{
		title: "Alisamento progressivo",
		duration: 50,
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
			title: "Alisamento progressivo",
			duration: 50,
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
			title: "Corte de Cabelo",
			duration: 40,
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
			title: "Manicure",
			duration: 50,
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
			title: "Sobrancelha",
			duration: 30,
			value: 50,
			start: TODAY_STR + "T08:00:00",
			end: TODAY_STR + "T08:30:00",
			backgroundColor: "#ffc34d",
		},
	},
	{
		client: {
			name: "nome de algumem",
			phone: "84848484847",
		},
		service: {
			title: "Sobrancelha",
			duration: 30,
			value: 50,
			start: "2023-03-08T08:00:00",
			end: "2023-03-08T08:30:00",
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

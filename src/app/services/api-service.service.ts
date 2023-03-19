import { Injectable } from "@angular/core";
import "../temporary-utils/data";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EventData, OfficeTime, Service, UserData } from "../temporary-utils/data";

@Injectable()
export class ApiService {
	apiUrlV1 = "http://localhost:8080/api/v1";
	officeTime!: OfficeTime;

	constructor(private httpClient: HttpClient) {}

	getEvents(): Promise<EventData[]> {
		return new Promise((resolve) => {
			this.httpClient
				.get<EventData[]>(`${this.apiUrlV1}/events`)
				.subscribe((data) => resolve(data));
		});
	}

	addEvent(event: EventData) {}

	getServices(): Promise<Service[]> {
		return new Promise((resolve) => {
			this.httpClient
				.get<Service[]>(`${this.apiUrlV1}/services`)
				.subscribe((data) => resolve(data));
		});
	}

	addService(service: Service) {}

	deleteService(service: Service) {}

	getOfficeTime(userId: number): Promise<UserData> {
		return new Promise((resolve) => {
			this.httpClient
				.get<UserData>(`${this.apiUrlV1}/users/${userId}`)
				.subscribe((data) => resolve(data));
		});
	}
}

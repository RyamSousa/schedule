import { Injectable } from "@angular/core";
import "../temporary-utils/data";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Event, OfficeTime, Service, UserData } from "../temporary-utils/data";

@Injectable()
export class ApiService {
	apiUrlV1 = "http://localhost:8080/api/v1";
	officeTime!: OfficeTime;

	constructor(private httpClient: HttpClient) {}

	getEvents(): Promise<Event[]> {
		return new Promise((resolve) => {
			this.httpClient
				.get<Event[]>(`${this.apiUrlV1}/events`)
				.subscribe((data) => resolve(data));
		});
	}

	addEvent(event: Event) {}

	getServices(): Observable<Service[]> {
		return this.httpClient.get<Service[]>(`${this.apiUrlV1}/services`);
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

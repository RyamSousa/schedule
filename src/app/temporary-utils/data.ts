export interface Service {
	name: string;
	value: number;
	duration: string;
	start: string;
	end: string;
	backgroundColor: string;
}

export interface FormData {
	name: string;
	phone: string;
	service: Service;
}

export interface ClientEvent {
	client: ClientData;
	service: Service;
}
export interface ClientData {
	name: string;
	phone: string;
}

export interface UserData {
	officeTime: OfficeTime;
	services: Service[];
}

export interface OfficeTime {
	maxOfficeTime: string;
	minOfficeTime: string;
}

export interface EventCalendar {
	title: string;
	start: string;
	end: string;
	backgroundColor: string;
	extendedProps: {
		value: number;
		client: ClientData;
		duration: string;
	};
}

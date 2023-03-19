export interface UserData {
	id: number;
	uuid: string;
	name: string;
	occupation: string;
	officeTime: OfficeTime;
	services: Service[];
}

export interface OfficeTime {
	maxOfficeTime: string;
	minOfficeTime: string;
}

export interface Service {
	id?: string;
	uuid: string;
	name: string;
	duration: number;
	value: number;
	color: string;
	user?: UserData;
}

export interface FormData {
	name: string;
	phone: string;
	service: Service;
}

export interface EventData {
	id?: number;
	uuid: string;
	clientName: string;
	clientPhone: string;
	start: string;
	end: string;
	service: Service;
}

export interface EventCalendar {
	title: string;
	start: string;
	end: string;
	backgroundColor?: string;
	extendedProps?: {
		eventData: EventData;
	};
}

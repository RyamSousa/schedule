export interface Service {
	title: string;
	value: number;
	duration: number;
	start: string;
	end: string;
	backgroundColor: string;
}

export interface UserData {
	officeTime: OfficeTime;
	services: Service[];
}

export interface OfficeTime {
	maxOfficeTime: string;
	minOfficeTime: string;
}

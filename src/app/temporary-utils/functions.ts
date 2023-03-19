import { CalendarApi, DateSelectArg } from "@fullcalendar/core";
import { v4 as uuidv4 } from "uuid";

export const BREAKPOINTS = {
	xs: { max: 425 },
	sm: { min: 426, max: 576 },
	md: { min: 577, max: 767 },
	lg: { min: 768, max: 1024 },
	xl: { min: 1025, max: 1440 },
	xxl: { min: 1441 },
};

export function generateUUid() {
	return uuidv4();
}

export function isMobile() {
	const width =
		window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	return width <= BREAKPOINTS.md.max;
}

export function formatDate(date: Date): String {
	return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}
    T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export function validRangeEvent(selectInfo: DateSelectArg, calendarApi: CalendarApi): boolean {
	let events = calendarApi.getEvents();
	let allowed = true;

	events.forEach((event) => {
		let selectStart = new Date(selectInfo.start);
		let selectEnd = new Date(selectInfo.end);
		let actualStart = new Date((event?.start as unknown) as string);
		let actualEnd = new Date((event?.end as unknown) as string);
		let actualDay = actualStart.getDay();
		let selectedDay = actualStart.getDay();

		if (selectedDay === actualDay) {
			// case 1: data com inicio fora e fim dentro do range
			if (
				selectStart < actualStart &&
				selectStart < actualEnd &&
				selectEnd > actualStart &&
				selectEnd < actualEnd
			) {
				allowed = false;
			}
			// case 2: data com inicio dentro e fim fora do range
			if (
				selectStart > actualStart &&
				selectStart < actualEnd &&
				selectEnd > actualStart &&
				selectEnd > actualEnd
			) {
				allowed = false;
			}
			// case 3: data com inicio e fim dentro do range
			if (
				selectStart > actualStart &&
				selectStart < actualEnd &&
				selectEnd > actualStart &&
				selectEnd < actualEnd
			) {
				allowed = false;
			}
			// case 4: data com inicio e fim fora do range, mas com outra danta dentro
			if (
				actualStart > selectStart &&
				actualStart < selectEnd &&
				actualEnd > selectStart &&
				actualEnd < selectEnd
			) {
				allowed = false;
			}

			// case 5: data com inicio fora e fim igual ao final do range
			if (
				selectStart < actualStart &&
				selectStart < actualEnd &&
				selectEnd > actualStart &&
				selectEnd.getDate() === actualEnd.getDate()
			) {
				allowed = false;
			}
		}
	});

	return allowed;
}

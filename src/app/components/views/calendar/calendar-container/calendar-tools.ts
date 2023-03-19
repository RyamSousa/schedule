import { CalendarOptions } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import localePt from "@fullcalendar/core/locales/pt";

export const calendarSettings: CalendarOptions = {
	plugins: [interactionPlugin, timeGridPlugin],
	initialView: "timeGridWeek",
	titleFormat: { year: "numeric", month: "long", day: "2-digit" },
	headerToolbar: {
		left: "title",
		right: "today prev,next",
	},
	views: {
		timeGridFourDay: {
			type: "timeGrid",
			duration: { days: 4 },
		},
	},
	allDaySlot: false,
	locale: localePt,
	weekends: true,
	editable: false,
	selectable: true,
	initialEvents: [],
	selectMirror: true,
	dayMaxEvents: true,
	longPressDelay: 10,
	contentHeight: "auto",
};

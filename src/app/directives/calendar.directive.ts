import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
	selector: "[appCalendar]",
})
export class CalendarDirective {
	constructor(public viewContainerRef: ViewContainerRef) {}
}

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "appFormatTimeText",
})
export class FormatTimeTextPipe implements PipeTransform {
	transform(value: string): string {
		return value.split("-")[0];
	}
}

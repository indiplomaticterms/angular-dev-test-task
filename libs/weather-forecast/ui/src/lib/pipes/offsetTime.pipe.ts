import { Pipe, PipeTransform } from "@angular/core";
import { format } from "date-fns";

@Pipe({
	name: 'offsetTime'
})
export class OffsetTimePipe implements PipeTransform {
	transform(dt: Date, offsetSeconds: number, formatString: string) {
		if (!dt) return null;
		const localTime = +dt + new Date().getTimezoneOffset()*60*1000 + offsetSeconds*1000;
		return format(localTime, formatString);
	}
}
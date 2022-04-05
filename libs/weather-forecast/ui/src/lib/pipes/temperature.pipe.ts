import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {
	transform(value: number) {
		return value == null ? '' : `${value.toFixed(0)}°`;
	}
}
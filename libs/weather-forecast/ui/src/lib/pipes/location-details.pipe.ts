import { Pipe, PipeTransform } from "@angular/core";
import { Location } from "@bp/weather-forecast/state";

@Pipe({
	name: 'locationDetails'
})
export class LocationDetailsPipe implements PipeTransform {
	transform(value: Location) {
		if (!value) return null;
		if (!value.state) return value.country;
		return `${value.state}, ${value.country}`;
	}
}
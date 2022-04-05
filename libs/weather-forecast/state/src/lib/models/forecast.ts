import { Location } from "./location";
import { ForecastMode } from "./forecast-mode";
import { Timestamp } from "./timestamp";

export interface Forecast {
	id: string;
	loaded: Date;
	location: Location;
	mode: ForecastMode;
	timezoneOffset: number;
	items: ForecastItem[];
}

export interface ForecastItem {
	timestamp: Timestamp;
	temp: number;
}

export function buildForecastId(location: Location, mode: ForecastMode): string {
	return `${location.id}|${mode}`;
}
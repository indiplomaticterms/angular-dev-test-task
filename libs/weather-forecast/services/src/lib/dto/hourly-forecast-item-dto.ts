import { DateTime } from "./date-time";

export interface HourlyForecastItemDto {
	dt: DateTime;
	temp: number;
}
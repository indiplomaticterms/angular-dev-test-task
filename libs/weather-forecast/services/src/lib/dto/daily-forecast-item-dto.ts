import { DateTime } from "./date-time";

export interface DailyForecastItemDto {
	dt: DateTime;
	temp: {
		day: number;
	}
}
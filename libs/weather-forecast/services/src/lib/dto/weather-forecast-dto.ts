import { DailyForecastItemDto } from './daily-forecast-item-dto';
import { HourlyForecastItemDto } from './hourly-forecast-item-dto';

export interface WeatherForecastDto {
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
	hourly?: HourlyForecastItemDto[];
	daily?: DailyForecastItemDto[];
}
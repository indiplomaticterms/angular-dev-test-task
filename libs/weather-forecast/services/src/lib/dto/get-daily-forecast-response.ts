import { WeatherForecastDto } from "./weather-forecast-dto";

export type GetDailyForecastResponse = Omit<WeatherForecastDto, 'hourly'>

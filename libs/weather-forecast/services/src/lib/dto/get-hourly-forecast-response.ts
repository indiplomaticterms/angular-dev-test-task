import { WeatherForecastDto } from "./weather-forecast-dto";

export type GetHourlyForecastResponse = Omit<WeatherForecastDto, 'daily'>

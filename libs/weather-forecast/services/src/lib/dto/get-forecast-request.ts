export interface GetForecastRequest {
	lat: number;
	lon: number;
	/** @default 'standard' */
	units?: 'standard' | 'metric' | 'imperial'
}
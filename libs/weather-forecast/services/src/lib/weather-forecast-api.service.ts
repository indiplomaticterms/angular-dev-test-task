import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { 
	SearchLocationsRequest,
	SearchLocationsResponse,
	GetForecastRequest,
	WeatherForecastDto,
	GetHourlyForecastResponse,
	GetDailyForecastResponse
} from './dto';

@Injectable({providedIn: 'root'})
export class WeatherForecastApiService {

	private _apiUrl = 'https://api.openweathermap.org';
	private _apiKey = '010721642521f31b0fbc8c3831d45951';

	constructor(private _http: HttpClient) {}

	searchLocations(request: SearchLocationsRequest): Observable<SearchLocationsResponse> {
		const url = `${this._apiUrl}/geo/1.0/direct`;
		
		const params = new HttpParams()
			.set('q', request.locationName)
			.set('limit', request.limit ?? 1)
			.set('appid', this._apiKey);
		
		return this._http.get<SearchLocationsResponse>(url, {params});
	}

	getHourlyForecast(request: GetForecastRequest): Observable<GetHourlyForecastResponse> {
		return this._getForecast(request, 'current,minutely,daily,alerts');
	}

	getDailyForecast(request: GetForecastRequest): Observable<GetDailyForecastResponse> {
		return this._getForecast(request, 'current,minutely,hourly,alerts');
	}

	private _getForecast({lat, lon, units}: GetForecastRequest, exclude: string): Observable<WeatherForecastDto> {
		const url = `${this._apiUrl}/data/2.5/onecall`;
		
		let params = new HttpParams()
			.set('lat', lat)
			.set('lon', lon)
			.set('exclude', exclude)
			.set('appid', this._apiKey);
		
		if (units) params = params.set('units', units);
	
		return this._http.get<WeatherForecastDto>(url, {params});
	}
}
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';

import {
	GetDailyForecastResponse,
	GetForecastRequest,
	GetHourlyForecastResponse,
	LocationDto,
	toDate,
	WeatherForecastApiService
} from '@bp/weather-forecast/services';

import * as StateActions from './state.actions';
import * as StateFeature from './state.reducer';
import * as StateSelectors from './state.selectors';
import { buildForecastId, buildLocationId, Forecast, ForecastMode, Location } from '../models';
import { buildDayTimestampId, buildHourTimestampId } from '../models/timestamp';

@Injectable()
export class WeatherForecastStateEffects {

	constructor(
		private readonly actions$: Actions,
		private readonly store: Store<StateFeature.WeatherForecastState>,
		private readonly weatherForecastApi: WeatherForecastApiService
	) {}

	searchLocation$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StateActions.searchLocation),
			fetch({
				id: ({query}) => query.trim(),
				run: ({query}) => this.weatherForecastApi.searchLocations({ locationName: query, limit: 1 }).pipe(
					map(response => response?.[0]),
					map(dto => dto
						? StateActions.locationSearchSuccess({ location: buildLocation(dto) })
						: StateActions.locationNotFound({ query })
					)
				),
				onError: ({query}, error) => {
					console.error(`[${StateActions.WeatherForecastActions.SearchLocation}] Error`, {query, error});
					return StateActions.locationSearchFailure({ query, error });
				},
			})
		)
	);

	ensureForecastIsLoaded$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StateActions.locationSearchSuccess),
			concatLatestFrom(() => this.store.select(StateSelectors.getForecastMode)),
			concatLatestFrom(([{location}, mode]) => this.store.select(StateSelectors.getForecastByLocationAndMode(location, mode))),
			map(([[{location}, mode], forecast]) => {
				return forecast
					? StateActions.forecastAlreadyLoaded({ forecast })
					: StateActions.loadForecast({ location, mode })
			})
		)
	);


	loadForecast$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StateActions.loadForecast),
			fetch({
				id: ({location, mode}) => `${location.id}|${mode}`,
				run: ({location, mode}) => {
					const request: GetForecastRequest = {
						lat: location.geo.lat,
						lon: location.geo.lon,
						units: 'metric'
					};
					switch(mode) {
						case ForecastMode.Daily:
							return this.weatherForecastApi.getDailyForecast(request).pipe(
								map(response => buildDailyForecast(location, response)),
								map(forecast => StateActions.forecastLoadSuccess({forecast}))
							);
						case ForecastMode.Hourly:
							return this.weatherForecastApi.getHourlyForecast(request).pipe(
								map(response => buildHourlyForecast(location, response)),
								map(forecast => StateActions.forecastLoadSuccess({forecast}))
							);
						default:
							console.warn(`[${StateActions.WeatherForecastActions.LoadForecast}] Unexpected mode`, {location, mode});
							return EMPTY;
					}
				},
				onError: ({location, mode}, error) => {
					console.error(`[${StateActions.WeatherForecastActions.LoadForecast}] Error`, {location, mode, error});
					return StateActions.forecastLoadFailure({ error });
				},
			})
		)
	);
}


function buildLocation(dto: LocationDto): Location {
	return {
		id: buildLocationId(dto.name, dto.country, dto.state),
		name: dto.name,
		country: dto.country,
		state: dto.state,
		geo: {
			lat: dto.lat,
			lon: dto.lon
		}
	};
}

function buildHourlyForecast(location: Location, dto: GetHourlyForecastResponse): Forecast {
	return {
		id: buildForecastId(location, ForecastMode.Hourly),
		loaded: new Date(),
		location,
		mode: ForecastMode.Hourly,
		timezoneOffset: dto.timezone_offset,
		items: dto.hourly?.filter(x => x.dt)
			.map(x => ({
				timestamp: {
					id: buildHourTimestampId(toDate(x.dt)),
					dt: toDate(x.dt),
				},
				temp: x.temp
			})) ?? []
	};
}

function buildDailyForecast(location: Location, dto: GetDailyForecastResponse): Forecast {
	return {
		id: buildForecastId(location, ForecastMode.Daily),
		location,
		loaded: new Date(),
		mode: ForecastMode.Daily,
		timezoneOffset: dto.timezone_offset,
		items: dto.daily?.filter(x => x.dt)
			.map(x => ({
				timestamp: {
					id: buildDayTimestampId(toDate(x.dt)),
					dt: toDate(x.dt),
				},
				temp: x.temp?.day
			})) ?? []
	};
}

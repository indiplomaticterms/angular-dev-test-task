import { createAction, props } from '@ngrx/store';

import { Forecast, ForecastMode } from '../models';
import { Location } from '../models/location';

export enum WeatherForecastActions {
	SearchLocation = 'SearchLocation',
	LocationSearchSuccess = 'LocationSearchSuccess',
	LocationSearchFailure = 'LocationSearchFailure',
	LocationNotFound = 'LocationNotFound',
	LoadForecast = 'LoadForecast',
	ForecastLoadSuccess = 'ForecastLoadSuccess',
	ForecastLoadFailure = 'ForecastLoadFailure',
	ForecastAlreadyLoaded = 'ForecastAlreadyLoaded',
	SetForecastMode = 'SetForecastMode'
}

export const setForecastMode = createAction(
	WeatherForecastActions.SetForecastMode,
	props<{ mode: ForecastMode }>()
);

export const searchLocation = createAction(
	WeatherForecastActions.SearchLocation, 
	props<{ query: string }>()
);

export const locationSearchSuccess = createAction(
	WeatherForecastActions.LocationSearchSuccess,
	props<{ location: Location }>()
);

export const locationNotFound = createAction(
	WeatherForecastActions.LocationNotFound,
	props<{ query: string }>()
);

export const locationSearchFailure = createAction(
	WeatherForecastActions.LocationSearchFailure,
	props<{ query: string, error: unknown }>()
);

export const loadForecast = createAction(
	WeatherForecastActions.LoadForecast,
	props<{ location: Location, mode: ForecastMode }>()
);

export const forecastLoadSuccess = createAction(
	WeatherForecastActions.ForecastLoadSuccess,
	props<{ forecast: Forecast }>()
);

export const forecastAlreadyLoaded = createAction(
	WeatherForecastActions.ForecastAlreadyLoaded,
	props<{ forecast: Forecast }>()
);

export const forecastLoadFailure = createAction(
	WeatherForecastActions.ForecastLoadFailure,
	props<{ error: unknown }>()
);

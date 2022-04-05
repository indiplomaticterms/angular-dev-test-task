import { createFeatureSelector, createSelector } from '@ngrx/store';

import { STATE_FEATURE_KEY, WeatherForecastState, stateAdapter } from './state.reducer';
import { Forecast, ForecastMode, ForecastTable, Location } from '../models';

export const getWeatherForecastState = createFeatureSelector<WeatherForecastState>(STATE_FEATURE_KEY);

const { selectAll } = stateAdapter.getSelectors();

export const getSearchQuery = createSelector(getWeatherForecastState, state => state.searchQuery);

export const getForecastMode = createSelector(getWeatherForecastState, state => state.mode);

export const getIsLoading = createSelector(getWeatherForecastState, state => state.loading);

export const getIsNothingFound = createSelector(getWeatherForecastState, state => state.nothingFound);

export const getAlreadyFound = createSelector(getWeatherForecastState, state => state.alreadyFound);

export const getError = createSelector(getWeatherForecastState, state => state.error);

export const getForecasts = createSelector(getWeatherForecastState, selectAll);

export const getForecastByLocationAndMode = (location: Location, mode: ForecastMode) => createSelector(
	getForecasts,
	forecasts => forecasts.find(x => x.location?.id === location?.id && x.mode === mode)
);

export const getForecastTable = (mode: ForecastMode) => createSelector(
	getForecasts,
	forecasts => buildForecastTable(forecasts, mode)
);




function buildForecastTable(forecasts: Forecast[], mode: ForecastMode): ForecastTable | undefined {
	const modeForecasts = forecasts.filter(f => f.mode === mode);
	if (!modeForecasts.length) return undefined;

	const table: ForecastTable = {
		cols: [],
		rows: []
	};

	// display rows in data load order
	modeForecasts.sort((a, b) => +a.loaded - +b.loaded);

	// build columns (timestamps) from the last loaded forecast
	const lastLoadedForecast = modeForecasts[modeForecasts.length - 1];
	switch (mode) {
		case ForecastMode.Hourly:
			// assume hourly forecast contains items with 1 hour step 
			for (let i = 0; i < lastLoadedForecast.items.length && table.cols.length < 8; i += 3) {
				table.cols.push(lastLoadedForecast.items[i].timestamp);
			}
			break;
		case ForecastMode.Daily:
			// assume daily forecast contains items with 1 day step 
			for (let i = 0; i < lastLoadedForecast.items.length && table.cols.length < 7; i++) {
				table.cols.push(lastLoadedForecast.items[i].timestamp);
			}
			break;
		default:
			console.warn('Unable to build forecast table: unexpected mode', {forecasts, mode});
			return undefined;
	}

	// build rows
	modeForecasts.forEach(forecast => {
		const row: ForecastTable['rows'][0] = {
			location: forecast.location,
			timezoneOffset: forecast.timezoneOffset,
			cells: {}
		};
		table.rows.push(row);
		forecast.items.forEach(item => {
			if (table.cols.some(col => col.id === item.timestamp.id)) {
				row.cells[item.timestamp.id] = {
					temp: item.temp
				};
			}
		});
	});

	return table;
}


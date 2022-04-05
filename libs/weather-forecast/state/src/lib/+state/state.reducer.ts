import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as Actions from './state.actions';
import { ForecastMode, Location, Forecast } from '../models';

export const STATE_FEATURE_KEY = 'weather-forecast';

export interface WeatherForecastPartialState {
	readonly [STATE_FEATURE_KEY]: WeatherForecastState;
}

export interface WeatherForecastState extends EntityState<Forecast> {
	mode: ForecastMode;
	searchQuery?: string;
	loading?: boolean;
	nothingFound?: boolean;
	alreadyFound?: Location;
	error?: unknown;
}

export const stateAdapter: EntityAdapter<Forecast> = createEntityAdapter<Forecast>();

const initialState: WeatherForecastState = stateAdapter.getInitialState({
	mode: ForecastMode.Hourly
});

const stateReducer = createReducer(
	initialState,

	on(Actions.setForecastMode, (state, {mode}) => ({
		...state,
		mode,
		searchQuery: undefined,
		loading: false,
		nothingFound: undefined,
		alreadyFound: undefined,
		error: undefined,
	})),

	on(Actions.searchLocation, (state, {query}) => ({
		 ...state,
		 searchQuery: query,
		 loading: true,
		 nothingFound: undefined,
		 alreadyFound: undefined,
		 error: undefined,
	})),

	on(Actions.locationSearchFailure, (state, {error}) => ({
		...state,
		loading: false,
		error,
	})),
	
	on(Actions.locationNotFound, state => ({
		...state,
		loading: false,
		nothingFound: true,
	})),

	on(Actions.forecastAlreadyLoaded, (state, {forecast}) => ({
		...state,
		loading: false,
		alreadyFound: forecast.location,
	})),

	on(Actions.forecastLoadFailure, (state, {error}) => ({
		...state,
		loading: false,
		error,
	})),	

	on(Actions.forecastLoadSuccess, (state, {forecast}) => ({
		...stateAdapter.upsertOne(forecast, state),
		loading: false
	})),		
);

export function reducer(state: WeatherForecastState | undefined, action: Action) {
	return stateReducer(state, action);
}
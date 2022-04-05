import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ForecastMode } from '../models';

import * as StateActions from './state.actions';
import * as StateFeature from './state.reducer';
import * as StateSelectors from './state.selectors';

@Injectable({providedIn: 'root'})
export class WeatherForecastStateFacade {
	
	mode$ = this.store.pipe(select(StateSelectors.getForecastMode));
	searchQuery$ = this.store.pipe(select(StateSelectors.getSearchQuery));
	loading$ = this.store.pipe(select(StateSelectors.getIsLoading));
	nothigFound$ = this.store.pipe(select(StateSelectors.getIsNothingFound));
	alreadyFound$ = this.store.pipe(select(StateSelectors.getAlreadyFound));
	error$ = this.store.pipe(select(StateSelectors.getError));
	hourlyTable$ = this.store.pipe(select(StateSelectors.getForecastTable(ForecastMode.Hourly)));
	dailyTable$ = this.store.pipe(select(StateSelectors.getForecastTable(ForecastMode.Daily)));
	
	constructor(private readonly store: Store<StateFeature.WeatherForecastState>) {}

	searchLocation(query: string) {
		this.store.dispatch(StateActions.searchLocation({query}));
	}

	setMode(mode: ForecastMode) {
		this.store.dispatch(StateActions.setForecastMode({mode}));
	}
}

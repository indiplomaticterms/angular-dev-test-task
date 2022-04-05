import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { WeatherForecastServicesModule } from '@bp/weather-forecast/services';

import * as fromState from './+state/state.reducer';
import { WeatherForecastStateEffects } from './+state/state.effects';
// import { StateFacade } from './+state/state.facade';

@NgModule({
	imports: [
		CommonModule,
		WeatherForecastServicesModule,
		StoreModule.forFeature(fromState.STATE_FEATURE_KEY, fromState.reducer),
		EffectsModule.forFeature([WeatherForecastStateEffects]),
	]
})
export class WeatherForecastStateModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { WeatherForecastUiModule } from '@bp/weather-forecast/ui';

import { WeatherForecastFeatureSearchRoutingModule } from './weather-forecast-feature-search-routing.module';
import { ForecastSearchPageComponent } from './forecast-search-page/forecast-search-page.component';
import { HourlyForecastComponent } from './hourly-forecast/hourly-forecast.component';
import { DailyForecastComponent } from './daily-forecast/daily-forecast.component';

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
		MatSnackBarModule,
		MatToolbarModule,
		MatTooltipModule,
		WeatherForecastUiModule,
		WeatherForecastFeatureSearchRoutingModule
	],
	declarations: [
		ForecastSearchPageComponent,
		HourlyForecastComponent,
		DailyForecastComponent
	],
	exports: [
		ForecastSearchPageComponent
	],
})
export class WeatherForecastFeatureSearchModule {}

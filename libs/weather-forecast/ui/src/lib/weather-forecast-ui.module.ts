import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { WeatherForecastStateModule } from '@bp/weather-forecast/state';

import { ForecastModeToggleComponent } from './forecast-mode-toggle/forecast-mode-toggle.component';
import { LocationSearchInputComponent } from './location-search-input/location-search-input.component';
import { ForecastTableComponent } from './forecast-table/forecast-table.component';
import { TemperaturePipe } from './pipes/temperature.pipe';
import { LocationDetailsPipe } from './pipes/location-details.pipe';
import { OffsetTimePipe } from './pipes/offsetTime.pipe';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatIconModule,
		MatProgressSpinnerModule,
		MatTableModule,
		MatTooltipModule,
		WeatherForecastStateModule
	],
	declarations: [
		ForecastModeToggleComponent,
		LocationSearchInputComponent,
		ForecastTableComponent,
		TemperaturePipe,
		LocationDetailsPipe,
		OffsetTimePipe
	],
	exports: [
		ForecastModeToggleComponent,
		LocationSearchInputComponent,
		ForecastTableComponent,
		TemperaturePipe,
		LocationDetailsPipe,
		OffsetTimePipe
	],
	providers: [
		TemperaturePipe,
		LocationDetailsPipe,
		OffsetTimePipe
	]
})
export class WeatherForecastUiModule {}

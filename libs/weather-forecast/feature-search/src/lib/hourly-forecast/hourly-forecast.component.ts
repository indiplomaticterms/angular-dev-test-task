import { Component } from '@angular/core';
import { WeatherForecastStateFacade } from '@bp/weather-forecast/state';

@Component({
	selector: 'bp-hourly-forecast',
	templateUrl: './hourly-forecast.component.html',
	styleUrls: ['./hourly-forecast.component.scss']
})
export class HourlyForecastComponent {

	hourlyTable$ = this._stateFacade.hourlyTable$;

	constructor(private _stateFacade: WeatherForecastStateFacade) { }
}

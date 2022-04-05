import { Component } from '@angular/core';
import { WeatherForecastStateFacade } from '@bp/weather-forecast/state';

@Component({
	selector: 'bp-daily-forecast',
	templateUrl: './daily-forecast.component.html',
	styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent {

	dailyTable$ = this._stateFacade.dailyTable$;

	constructor(private _stateFacade: WeatherForecastStateFacade) { }
}

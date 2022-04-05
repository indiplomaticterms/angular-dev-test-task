import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { ForecastMode } from '@bp/weather-forecast/state';

@Component({
	selector: 'bp-forecast-mode-toggle',
	templateUrl: './forecast-mode-toggle.component.html',
	styleUrls: ['./forecast-mode-toggle.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastModeToggleComponent {

	@Input() value: ForecastMode = ForecastMode.Hourly;
	
	@Input() disabled = false;
	
	@Output() valueChange = new EventEmitter<ForecastMode>();
}

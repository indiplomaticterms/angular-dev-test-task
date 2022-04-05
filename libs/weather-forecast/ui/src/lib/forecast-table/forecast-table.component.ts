import { Component, ChangeDetectionStrategy, Input, ContentChild, TemplateRef } from '@angular/core';
import { ForecastTable } from '@bp/weather-forecast/state';

@Component({
	selector: 'bp-forecast-table',
	templateUrl: './forecast-table.component.html',
	styleUrls: ['./forecast-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastTableComponent {

	private _datasource?: ForecastTable;

	get datasource(): ForecastTable | undefined {
		return this._datasource;
	}
	@Input() set datasource(value: ForecastTable | undefined){
		this._datasource = value;
		this.displayedColumns = ['cityName', ...value?.cols?.map(x => x.id) ?? []];
	}

	displayedColumns?: string[];

	@ContentChild('headerCell') headerCellTemplateRef?: TemplateRef<any>;
	@ContentChild('cell') cellTemplateRef?: TemplateRef<any>;
}

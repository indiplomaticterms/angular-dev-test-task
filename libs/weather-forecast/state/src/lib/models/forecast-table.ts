import { Location } from './location';
import { Timestamp } from './timestamp';

export interface ForecastTable {
	cols: Timestamp[];
	rows: Array<{
		location: Location;
		timezoneOffset: number;
		cells: { 
			[timestampId: string]: ForecastTableCell
		}
	}>;
}

export interface ForecastTableCell {
	temp: number;
}

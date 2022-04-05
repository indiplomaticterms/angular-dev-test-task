import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate } from "@angular/router";

import { ForecastMode, WeatherForecastStateFacade } from "@bp/weather-forecast/state";

@Injectable({ providedIn: 'root' })
export class ForecastRouteGuard implements CanActivate {

	constructor(private _stateFacade: WeatherForecastStateFacade) {}

	canActivate(route: ActivatedRouteSnapshot): boolean {
		
		const mode = route.url[0]?.path as ForecastMode; // expected url segments: ['hourly|daily', 'search', ...]
		const search = (route.queryParams as IForecastQueryParams).search;
		
		this._stateFacade.setMode(mode);
		if (search) this._stateFacade.searchLocation(search);
		
		return !!mode;
	}
}

interface IForecastQueryParams {
	search: string
}
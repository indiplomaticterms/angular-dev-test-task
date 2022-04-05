import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, Subject, takeUntil, tap } from 'rxjs';

import { ForecastMode, WeatherForecastStateFacade } from '@bp/weather-forecast/state';

@Component({
	selector: 'bp-forecast-search-page',
	templateUrl: './forecast-search-page.component.html',
	styleUrls: ['./forecast-search-page.component.scss']
})
export class ForecastSearchPageComponent implements OnInit, OnDestroy {

	protected readonly destroy$ = new Subject<void>();

	searchQuery$ = this._stateFacade.searchQuery$;
	forecastMode$ = this._stateFacade.mode$;
	loading$ = this._stateFacade.loading$;
	nothigFound$ = this._stateFacade.nothigFound$;
	error$ = this._stateFacade.error$;
	// hourlyTable$ = this._stateFacade.hourlyTable$;
	// dailyTable$ = this._stateFacade.dailyTable$;
	
	constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _matSnackBar: MatSnackBar,
		private _stateFacade: WeatherForecastStateFacade
	) {}

	ngOnInit(): void {
		this._setupAlreadyFoundMessage();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	onSearchSubmit(query: string) {
		this._router.navigate([], {relativeTo: this._activatedRoute, queryParams: {search: query}});
	}

	onModeChange(mode: ForecastMode) {
		if (mode) this._router.navigate([mode], {relativeTo: this._activatedRoute});
	}

	private _setupAlreadyFoundMessage() {
		this._stateFacade.alreadyFound$.pipe(
			takeUntil(this.destroy$),
			filter(Boolean),
			tap(location => this._matSnackBar.open(
				`Location "${location.name}" has already been added to the list`, 
				undefined, 
				{ duration: 3000 }
			))
		).subscribe();
	}
	
}

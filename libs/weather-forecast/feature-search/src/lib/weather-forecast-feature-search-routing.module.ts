import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ForecastSearchPageComponent } from "./forecast-search-page/forecast-search-page.component";
import { ForecastRouteGuard } from "./forecast-route-guard";
import { HourlyForecastComponent } from "./hourly-forecast/hourly-forecast.component";
import { DailyForecastComponent } from "./daily-forecast/daily-forecast.component";

const routes: Routes = [
	{ 
		path: '',
		component: ForecastSearchPageComponent,
		children: [
			{
				path: 'hourly',
				runGuardsAndResolvers: 'always',
				canActivate: [ForecastRouteGuard],
				component: HourlyForecastComponent
			},
			{
				path: 'daily',
				runGuardsAndResolvers: 'always',
				canActivate: [ForecastRouteGuard],
				component: DailyForecastComponent
			},
			{ path: '', redirectTo: 'hourly', pathMatch: 'full' },
			{ path: '**', redirectTo: 'hourly' }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class WeatherForecastFeatureSearchRoutingModule { }

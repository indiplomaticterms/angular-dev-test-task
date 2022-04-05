import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ 
		path: 'search',
		loadChildren: () => import('@bp/weather-forecast/feature-search').then(m => m.WeatherForecastFeatureSearchModule)
	},
	{ path: '',   redirectTo: 'search', pathMatch: 'full' },
	{ path: '**',   redirectTo: 'search', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
	exports: [RouterModule]
})
export class AppRoutingModule {}

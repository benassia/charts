import { Component, OnInit, OnDestroy, ViewChild} from "@angular/core";
import { AnalyticService, AegonDataSet } from './analytic.service';
import 'chartjs-adapter-luxon';
import { DataService, Identity } from './data.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
	selector: 'aegonradarchart',
	templateUrl: './aegonradarchart.component.html',
	styleUrls: ['./aegonradarchart.component.css']
})
export class AegonRadarChartComponent implements OnInit, OnDestroy {
	
	aegonDataSet: AegonDataSet;
	identity: Identity;

	constructor(private analytics: AnalyticService, private data: DataService) { }

    ngOnInit(): void {

		this.data.currentIdentity.subscribe(indentity => this.identity = indentity);
		this.analytics.getAegonAnalytics(this.identity);
		this.analytics.currentAegonDataSet.subscribe(aegonDataSet => this.aegonDataSet = aegonDataSet);
		//this.chart.update();

		


    }

    ngOnDestroy(): void {

	}
	
	@ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
	public isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
	public isChrome = /chrome/.test(window.navigator.userAgent.toLowerCase());
	
	async delay(ms: number) {
		return new Promise( resolve => setTimeout(resolve, ms) );
	}
}

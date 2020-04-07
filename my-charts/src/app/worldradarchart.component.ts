import { Component, OnInit, OnDestroy, ViewChild} from "@angular/core";
import { AnalyticService, WorldDataSet } from './analytic.service';
import 'chartjs-adapter-luxon';
import { Identity, DataService } from './data.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
	selector: 'worldradarchart',
	templateUrl: './worldradarchart.component.html',
	styleUrls: ['./worldradarchart.component.css']
})
export class WorldRadarChartComponent implements OnInit, OnDestroy {
	
	worldDataSet: WorldDataSet;
	identity: Identity;

	constructor(private analytics: AnalyticService, private data: DataService) { }

    ngOnInit(): void {
		this.data.currentIdentity.subscribe(indentity => this.identity = indentity);
		this.analytics.getWorldAnalytics(this.identity);
		this.analytics.currentWorldDataSet.subscribe(worldDataSet => this.worldDataSet = worldDataSet);
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

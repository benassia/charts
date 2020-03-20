import { Component, OnInit, OnDestroy} from "@angular/core";
import { AnalyticService, WorldDataSet } from './analytic.service';
import 'chartjs-adapter-luxon';

@Component({
	selector: 'worldradarchart',
	templateUrl: './worldradarchart.component.html',
	styleUrls: ['./worldradarchart.component.css']
})
export class WorldRadarChartComponent implements OnInit, OnDestroy {
	
	worldDataSet: WorldDataSet;

	constructor(private data: AnalyticService) { }

    ngOnInit(): void {
		this.data.currentWorldDataSet.subscribe(worldDataSet => this.worldDataSet = worldDataSet);
    }
    
    ngOnDestroy(): void {
        
    }

}

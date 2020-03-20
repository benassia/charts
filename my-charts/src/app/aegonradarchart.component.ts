import { Component, OnInit, OnDestroy} from "@angular/core";
import { AnalyticService, AegonDataSet } from './analytic.service';
import 'chartjs-adapter-luxon';

@Component({
	selector: 'aegonradarchart',
	templateUrl: './aegonradarchart.component.html',
	styleUrls: ['./aegonradarchart.component.css']
})
export class AegonRadarChartComponent implements OnInit, OnDestroy {
	
	aegonDataSet: AegonDataSet;

	constructor(private data: AnalyticService) { }

    ngOnInit(): void {
		this.data.currentAegonDataSet.subscribe(aegonDataSet => this.aegonDataSet = aegonDataSet);
    }

    ngOnDestroy(): void {

    }
}

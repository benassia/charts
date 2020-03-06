import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { Color, MultiDataSet, BaseChartDirective, SingleDataSet, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as luxon from 'luxon';
import 'chartjs-adapter-luxon';

@Component({
	selector: 'radarchart',
	templateUrl: './radarchart.component.html',
	styleUrls: ['./radarchart.component.css']
})
export class RadarChartComponent implements OnInit, OnDestroy {
    
    viewModel: RadarDataSet = {
		chartType: 'radar',
		chartLabels:[ ],
		chartData: [
			{data: [], label: ''}
		  ]
	}
    
    ngOnInit(): void {
        console.log('init dxchng');
        this.getProjectionData();
    }
    
    ngOnDestroy(): void {
        
    }

	async getProjectionData(){
		this.viewModel = await this.getDXProjections();
	}

    public async getDXProjections(): Promise<RadarDataSet> {
		//const sessions = await this.http.get(`${this.apiEndpoint}/dx/projections`, this.httpOptions).toPromise() as unknown as RadarDataSet;
		//return sessions;
		const viewModel: RadarDataSet = {
			chartType: 'radar',
			chartLabels:[ 'Tech', 'Health', 'Retail', 'Media', 'Finance', 'Lifestyle', 'Social', 'Personal'],
			chartData: [
				{data: [120, 130, 180, 70, 140, 30, 190, 21], label: '2017'},
				{data: [90, 150, 200, 45, 160, 115, 120, 41], label: '2018'},
				{data: [10, 200, 60, 110, 180, 130, 110, 11], label: '2019'}
			  ]
		};
		return Promise.resolve(viewModel);
	
	}
}

export interface RadarDataSet {
	chartType: string;
	chartLabels: string[];
	chartData: RadarData[];
}

export interface RadarData {
	data: number[];
	label: string;
}
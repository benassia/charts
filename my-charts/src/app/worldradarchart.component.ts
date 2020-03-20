import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { Color, MultiDataSet, BaseChartDirective, SingleDataSet, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as luxon from 'luxon';
import 'chartjs-adapter-luxon';

@Component({
	selector: 'worldradarchart',
	templateUrl: './worldradarchart.component.html',
	styleUrls: ['./worldradarchart.component.css']
})
export class WorldRadarChartComponent implements OnInit, OnDestroy {
	
	isWorldData = true;

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
		if (this.isWorldData){
			return this.getWorldData();
		}
		else{
			return this.getAegonData();
		}
		
	}

	public async getAegonData(): Promise<RadarDataSet> {

		const viewModel: RadarDataSet = {
			chartType: 'radar',
			chartLabels:[ 'TotalCases', 'New Cases', 'Recovered', 'Active', 'Serious', 'Total Staff'],
			chartData: [
				{data: [90, 150, 200, 45, 160, 45], label: 'Aegon NL'},
				{data: [120, 130, 180, 70, 140, 45], label: 'Aegon UK'},
				{data: [90, 150, 200, 45, 160, 45], label: 'Transamerica'},
				{data: [90, 150, 200, 45, 160, 45], label: 'Aegon Life'},
				{data: [90, 150, 200, 45, 160, 45], label: 'Aegon TK'},
				{data: [90, 150, 200, 45, 160, 45], label: 'Aegon RO'},
				{data: [90, 150, 200, 45, 160, 45], label: 'Aegon PL'},
				{data: [10, 200, 60, 110, 180, 45], label: 'Aegon SP'},
				{data: [90, 150, 200, 45, 160, 45], label: 'Aegon AAM'}
			  ]
		};
		return Promise.resolve(viewModel);
	}
    public async getWorldData(): Promise<RadarDataSet>{

		const viewModel: RadarDataSet = {
			chartType: 'radar',
			chartLabels:[ 'TotalCases', 'New Cases', 'Recovered', 'Active', 'Serious', 'Total Staff'],
			chartData: [
				{data: [90, 150, 200, 45, 160, 45], label: 'Aegon NL'},
				{data: [90, 150, 200, 45, 160, 45], label: 'AMM NL'},
				{data: [90, 150, 200, 45, 160, 45], label: 'NL'},
				{data: [120, 130, 180, 70, 140, 45], label: 'Aegon UK'},
				{data: [90, 150, 200, 45, 160, 45], label: 'AMM UK'},
				{data: [120, 130, 180, 70, 140, 45], label: 'UK'},
				{data: [90, 150, 200, 45, 160, 45], label: 'Transamerica'},
				{data: [90, 150, 200, 45, 160, 45], label: 'AMM US'},
				{data: [90, 150, 200, 45, 160, 45], label: 'USA'},
				{data: [90, 150, 200, 45, 160, 45], label: 'Aegon Life'},
				{data: [90, 150, 200, 45, 160, 45], label: 'India'},
				{data: [90, 150, 200, 45, 160, 45], label: 'Aegon TK'},
				{data: [90, 150, 200, 45, 160, 45], label: 'Turkey'},
				{data: [90, 150, 200, 45, 160, 45], label: 'Aegon RO'},
				{data: [90, 150, 200, 45, 160, 45], label: 'Romania'},
				{data: [90, 150, 200, 45, 160, 45], label: 'Aegon PL'},
				{data: [90, 150, 200, 45, 160, 45], label: 'Poland'},
				{data: [10, 200, 60, 110, 180, 45], label: 'Aegon SP'},
				{data: [10, 200, 60, 110, 180, 45], label: 'Spain'}
				
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
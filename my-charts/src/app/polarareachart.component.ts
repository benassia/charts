import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { Color, MultiDataSet, BaseChartDirective, SingleDataSet, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as luxon from 'luxon';
import 'chartjs-adapter-luxon';

@Component({
	selector: 'polarareachart',
	templateUrl: './polarareachart.component.html',
	styleUrls: ['./polarareachart.component.css']
})
export class PolarAreaChartComponent implements OnInit, OnDestroy {

    viewModel: PolarDataSet = {
        chartLabels: [],
        chartData: [],
        chartLegend: false,
        chartColors:[],
        chartType: 'polarArea'
      };

    ngOnInit(): void {
      console.log('init chart');
	  this.getOverviewData();
    }
    
    ngOnDestroy(): void {
      console.log('destroy chart');
    }

    async getOverviewData() {
      this.viewModel = await this.getDXOverview();
    }

    public async getDXOverview(): Promise<PolarDataSet> {
      const viewModel: PolarDataSet = {
        chartData: [300, 180, 100, 220, 120, 195, 220, 145],
        chartLabels: ['Tech', 'Health', 'Retail', 'Media', 'Finance', 'Lifestyle','Social','Personal'],
        chartLegend: true,
        chartColors: [
          { // red
            backgroundColor: 'rgba(255,0,0,0.3)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          },
          { // red
            backgroundColor: 'rgba(255,0,0,0.3)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            { // red
            backgroundColor: 'rgba(255,0,0,0.3)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            { // red
            backgroundColor: 'rgba(255,0,0,0.3)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            { // red
            backgroundColor: 'rgba(255,0,0,0.3)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
            }
          ],
        chartType: 'polarArea'
      };
      return Promise.resolve(viewModel);
    }

}

export interface PolarDataSet {
	chartData: number[];
	chartLabels: Label[];
	chartLegend: boolean;
	chartColors: Color[];
	chartType: string;
}
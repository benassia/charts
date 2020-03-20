import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Injectable({
  providedIn: 'root'
})

export class AnalyticService {

  worldDataSet: WorldDataSet = {
                                chartType: 'radar',
                                chartLabels: [ 'TotalCases', 'New Cases', 'Recovered', 'Active', 'Serious', 'Total Staff'],
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
  aegonDataSet: AegonDataSet = {
                                chartType: 'radar',
                                chartLabels: [ 'TotalCases', 'New Cases', 'Recovered', 'Active', 'Serious', 'Total Staff'],
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

  chartDataSet: ChartDataSet = {
                                chartData: [
                                  { data: [65, 59, 80, 81, 56, 55, 40], label: 'Temp' },
                                  { data: [28, 48, 40, 19, 86, 27, 90], label: 'Status' },
                                  { data: [2, 32, 25, 28, 74, 23, 12], label: 'Symptom', yAxisID: 'y-axis-1'}
                                  ],
                                chartLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                chartOptions: {
                                  responsive: true,
                                  scales: {
                                    // We use this empty structure as a placeholder for dynamic theming.
                                    xAxes: [{}],
                                    yAxes: [
                                    {
                                      id: 'y-axis-0',
                                      position: 'left',
                                    },
                                    {
                                      id: 'y-axis-1',
                                      position: 'right',
                                      gridLines: {
                                      color: 'rgba(255,0,0,0.3)',
                                      },
                                      ticks: {
                                      fontColor: 'red',
                                      }
                                    }
                                    ]
                                  },
                                  annotation: {
                                    annotations: [
                                    {
                                      type: 'line',
                                      mode: 'vertical',
                                      scaleID: 'x-axis-0',
                                      value: 'March',
                                      borderColor: 'orange',
                                      borderWidth: 2,
                                      label: {
                                      enabled: true,
                                      fontColor: 'orange',
                                      content: 'LineAnno'
                                      }
                                    },
                                    ],
                                  },
                                  },
                                chartColors: [
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
                                  },
                                  { // red
                                    backgroundColor: 'rgba(255,0,0,0.3)',
                                    borderColor: 'red',
                                    pointBackgroundColor: 'rgba(148,159,177,1)',
                                    pointBorderColor: '#fff',
                                    pointHoverBackgroundColor: '#fff',
                                    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
                                  }
                                  ],
                                chartLegend : true,
                                chartType :'line',
                                chartPlugins : [pluginAnnotations]
                              };

  private chartDataSetHandler = new BehaviorSubject(this.chartDataSet);
  currentChartDataSet = this.chartDataSetHandler.asObservable();

  private worldDataSetHandler = new BehaviorSubject(this.worldDataSet);
  currentWorldDataSet = this.worldDataSetHandler.asObservable();

  private aegonDataSetHandler = new BehaviorSubject(this.aegonDataSet);
  currentAegonDataSet = this.aegonDataSetHandler.asObservable();


  constructor() { }

  updateChartDataSet(chartDataSet: ChartDataSet) {
    this.chartDataSetHandler.next(chartDataSet);
  }

  updateWorldDataSet(worldDataSet: WorldDataSet) {
    this.worldDataSetHandler.next(worldDataSet);
  }

  updateAegonDataSet(aegonDataSet: AegonDataSet) {
    this.aegonDataSetHandler.next(aegonDataSet);
  }

}

export interface WorldDataSet {
  chartType: string;
  chartLabels: string[];
  chartData: WorldData[];
}

export interface WorldData {
  data: number[];
  label: string;
}

export interface AegonDataSet {
  chartType: string;
  chartLabels: string[];
  chartData: AegonData[];
}

export interface AegonData {
  data: number[];
  label: string;
}

export interface ChartDataSet {
	chartData: ChartDataSets[];
	chartLabels: Label[];
	chartOptions: (ChartOptions & { annotation: any });
	chartColors: Color[];
	chartLegend: boolean;
	chartType: string;
	chartPlugins: pluginAnnotations[];

}

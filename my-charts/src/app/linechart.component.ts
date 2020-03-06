import { Component, OnInit,  ViewChild,  OnDestroy  } from "@angular/core";
import { BaseChartDirective, Label, Color,   } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { ChartDataSets, ChartOptions } from 'chart.js';



@Component({
	selector: 'linechart',
	templateUrl: './linechart.component.html',
	styleUrls: ['./linechart.component.css']
})
export class LineChartComponent implements OnInit, OnDestroy {

    public viewModel: ChartDataSet = {
		chartData: [{data:[],label:''}],
		chartLabels: [],
		chartOptions: {annotation: ''},
		chartColors: [{ // grey
			backgroundColor: 'rgba(148,159,177,0.2)',
			borderColor: 'rgba(148,159,177,1)',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		  }],
		chartLegend: false,
		chartType: 'line',
		chartPlugins: [pluginAnnotations]
	};

    ngOnInit(): void {
        console.log('init dxchng');
		this.loadWealthData();
    }
    
    ngOnDestroy(): void {
        
    }

    @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
	public isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    public isChrome = /chrome/.test(window.navigator.userAgent.toLowerCase());
    
	async loadWealthData(): Promise<void>
	{
		this.viewModel = await this.getDXMarkets();
	}

    public async getDXMarkets(): Promise<ChartDataSet> {
		//const sessions = await this.http.get(`${this.apiEndpoint}/dx/markets`, this.httpOptions).toPromise() as unknown as ChartDataSet;
		//return sessions;
		const viewModel = {
			chartData: [
				{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Tech' },
				{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Health' },
				{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Retail' },
				{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Media' },
				{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Finance' },
				{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Lifestyle' },
				{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Social' },
				{ data: [180, 480, 770, 90, 1000, 270, 400], label: 'Personal', yAxisID: 'y-axis-1' }
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
		}
		return Promise.resolve(viewModel);
    }
    public randomize(): void {
		for (let i = 0; i < this.viewModel.chartData.length; i++) {
		  for (let j = 0; j < this.viewModel.chartData[i].data.length; j++) {
			this.viewModel.chartData[i].data[j] = this.generateNumber(i);
		  }
		}
		this.chart.update();
	  }
	
	  private generateNumber(i: number) {
		return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
	  }
	
	  // events
	  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
		console.log(event, active);
	  }
	
	  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
		console.log(event, active);
	  }
	
	  public hideOne() {
		const isHidden = this.chart.isDatasetHidden(1);
		this.chart.hideDataset(1, !isHidden);
	  }
	
	  public pushOne() {
		this.viewModel.chartData.forEach((x, i) => {
		  const num = this.generateNumber(i);
		  const data: number[] = x.data as number[];
		  data.push(num);
		});
		this.viewModel.chartLabels.push(`Label ${this.viewModel.chartLabels.length}`);
	  }
	
	  public changeColor() {
		this.viewModel.chartColors[2].borderColor = 'green';
		this.viewModel.chartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
	  }
	
	  public changeLabel() {
		this.viewModel.chartLabels[2] = '1st Line';
		// this.chart.update();
	  }
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
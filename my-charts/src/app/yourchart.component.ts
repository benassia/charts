import { Component, OnInit,  ViewChild,  OnDestroy  } from "@angular/core";
import { BaseChartDirective, Label, Color,   } from 'ng2-charts';
import { AnalyticService, ChartDataSet } from './analytic.service';
import { Identity, DataService } from './data.service';



@Component({
	selector: 'yourchart',
	templateUrl: './yourchart.component.html',
	styleUrls: ['./yourchart.component.css']
})
export class YourChartComponent implements OnInit, OnDestroy {

	chartDataSet: ChartDataSet;
	tableDataSet: ChartDataSet;
	identity: Identity;
	keySet=["temp","stats","symp"];

	constructor(private anaytics: AnalyticService, private data: DataService) { }

    ngOnInit(): void {
		this.data.currentIdentity.subscribe(indentity => this.identity = indentity);
		this.anaytics.getSelfAnalytics(this.identity);
		this.anaytics.currentChartDataSet.subscribe(chartDataSet => this.chartDataSet = chartDataSet);
		this.anaytics.currentTableDataSet.subscribe(tableDataSet => this.tableDataSet = tableDataSet);
		this.chart.update();
    }
    
    ngOnDestroy(): void {
        
    }

	@ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
	public isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    public isChrome = /chrome/.test(window.navigator.userAgent.toLowerCase());
    


    public randomize(): void {
		for (let i = 0; i < this.chartDataSet.chartData.length; i++) {
		  for (let j = 0; j < this.chartDataSet.chartData[i].data.length; j++) {
			this.chartDataSet.chartData[i].data[j] = this.generateNumber(i);
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
		this.chartDataSet.chartData.forEach((x, i) => {
		  const num = this.generateNumber(i);
		  const data: number[] = x.data as number[];
		  data.push(num);
		});
		this.chartDataSet.chartLabels.push(`Label ${this.chartDataSet.chartLabels.length}`);
	  }
	
	  public changeColor() {
		this.chartDataSet.chartColors[2].borderColor = 'green';
		this.chartDataSet.chartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
	  }
	
	  public changeLabel() {
		this.chartDataSet.chartLabels[2] = '1st Line';
		// this.chart.update();
	  }
}

import { Inject, Injectable, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SESSION_STORAGE, StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { KVLABELS, Identity } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AnalyticService {

  isCharting = false;

  chartingData = {  chartDataSet : [{data: [], label: ''}],
    chartLabels: []
  };

  worldDataSet: WorldDataSet = {
                                chartType: 'radar',
                                chartLabels: [ ],
                                chartData: [
                                  {data: [], label: ''}
                                  ]
                              };
  aegonDataSet: AegonDataSet = {
                                chartType: 'radar',
                                chartLabels: [ ],
                                chartData: [
                                  {data: [], label: ''}
                                  ]
                              };

  chartDataSet: ChartDataSet = {
                                chartData: this.chartingData.chartDataSet,
                                chartLabels: this.chartingData.chartLabels,
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
                                      value: '2-Jan',
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

  private apiEndpoint: String;
  private httpOptions: any;

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.apiEndpoint = environment.api.covid19;
   }

   public async initService() {
    this.setHeaders();
   }

  updateChartDataSet(chartDataSet: ChartDataSet) {
    this.storage.set( KVLABELS.PERNDS, chartDataSet);
    this.chartDataSetHandler.next(chartDataSet);
  }

  updateWorldDataSet(worldDataSet: WorldDataSet) {
    this.storage.set( KVLABELS.WORLDS, worldDataSet);
    this.worldDataSetHandler.next(worldDataSet);
  }

  updateAegonDataSet(aegonDataSet: AegonDataSet) {
    this.storage.set( KVLABELS.COMPYDS, aegonDataSet);
    this.aegonDataSetHandler.next(aegonDataSet);
  }
  

  private setHeaders() {
		//let token = this.currentSession.idToken.jwtToken;
		this.httpOptions = {
			headers: new HttpHeaders({
				//'Authorization': token,
				'Content-Type': 'application/json'
			}),
		};
  }

  async getWorldAnalytics(identity: Identity): Promise<Boolean> {
    this.initService();
    let result = false;
    // await this.setHttpOptions(); //need to find a way to fix this
    const data = await this.http.post(`${this.apiEndpoint}/worldanalytics`, identity, this.httpOptions).toPromise()
    .then(response1 => {
      this.worldDataSet = response1['WorldDataSet'];
      this.updateWorldDataSet(this.worldDataSet);
      result = true;
    })
    .catch(error => {
      //console.log(JSON.stringify(error))
     }) as unknown as WorldDataSet;


    return Promise.resolve(result);
  }

  async getAegonAnalytics(identity: Identity): Promise<Boolean> {
    this.initService();
    let result = false;
    // await this.setHttpOptions(); //need to find a way to fix this
    const data = await this.http.post(`${this.apiEndpoint}/aegonanalytics`, identity, this.httpOptions).toPromise()
    .then(response1 => {
      this.aegonDataSet = response1['AegonDataSet'];
      this.updateAegonDataSet(this.aegonDataSet);
      result = true;
    })
    .catch(error => {
      //console.log(JSON.stringify(error))
     }) as unknown as AegonDataSet;


    return Promise.resolve(result);
  }
  async getSelfAnalytics(identity: Identity): Promise<boolean> {
    this.initService();
    let result = false;
		// await this.setHttpOptions(); //need to find a way to fix this
    const data = await this.http.post(`${this.apiEndpoint}/selfanalytics`, identity, this.httpOptions).toPromise()
    .then(response1 => {
      this.chartDataSet.chartData = response1['chartDataSet'];
      this.chartDataSet.chartLabels = response1['chartLabels'];
      this.updateChartDataSet(this.chartDataSet);
      result = true;
    })
    .catch(error => {
      //console.log(JSON.stringify(error))
     }) as unknown as ChartingData;


		return Promise.resolve(result);
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

export interface ChartingData {
	chartData: ChartDataSets[];
  chartLabels: Label[];
}
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {ThemePalette} from '@angular/material/core';
//import * as geolib from 'geolib';

@Component({
	selector: 'locationtracker',
	templateUrl: './locationtracker.component.html',
	styleUrls: ['./locationtracker.component.css']
})
export class LocationTrackerComponent implements OnInit, OnDestroy {

    displayedColumns = ['trackpoint', 'latlng', 'datetime', 'maplink'];
    dataSource = ELEMENT_DATA;

    color: ThemePalette = 'warn';
    checked = false;
    disabled = false;
    radius = 0.5;
    trackStatus = false;

    ngOnInit(): void {
    }
    
    ngOnDestroy(): void {
        
    }

    setRadius(val): void{
      this.radius = val;
    }
    trackOnOff(): void {
      this.checked = !this.checked;
      if(this.checked){
        this.trackStatus = true;
      } else{
        this.trackStatus = false;
      }
      this.trackCoords();
      console.log(this.checked);
    }

    async delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }

    processPosition(position) {
      console.log(position);
    }

    async trackCoords(): Promise<void> {
      while ( this.checked ) {
      
      navigator.geolocation.getCurrentPosition(
        this.processPosition
      );
      await this.delay(30000);
      }
    }

}



const ELEMENT_DATA: PeriodicElement[] = [
    {trackpoint: 1, latlng: 'Hydrogen', datetime: 1.0079, maplink: 'H'},
    {trackpoint: 2, latlng: 'Helium', datetime: 4.0026, maplink: 'He'},
    {trackpoint: 3, latlng: 'Lithium', datetime: 6.941, maplink: 'Li'},
    {trackpoint: 4, latlng: 'Beryllium', datetime: 9.0122, maplink: 'Be'},
    {trackpoint: 5, latlng: 'Boron', datetime: 10.811, maplink: 'B'},
    {trackpoint: 6, latlng: 'Carbon', datetime: 12.0107, maplink: 'C'},
    {trackpoint: 7, latlng: 'Nitrogen', datetime: 14.0067, maplink: 'N'},
    {trackpoint: 8, latlng: 'Oxygen', datetime: 15.9994, maplink: 'O'},
    {trackpoint: 9, latlng: 'Fluorine', datetime: 18.9984, maplink: 'F'},
    {trackpoint: 10, latlng: 'Neon', datetime: 20.1797, maplink: 'Ne'},
  ];
  
  export interface PeriodicElement {
    latlng: string;
    trackpoint: number;
    datetime: number;
    maplink: string;
  }
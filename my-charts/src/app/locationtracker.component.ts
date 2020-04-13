import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ThemePalette } from '@angular/material/core';
import { DataService, Tracker, Track, KVLABELS, Identity } from './data.service';
import { PageService, TrackerPage } from './page.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'locationtracker',
  templateUrl: './locationtracker.component.html',
  styleUrls: ['./locationtracker.component.css']
})
export class LocationTrackerComponent implements OnInit, OnDestroy {

    static position: Track[] = [];
    static pointPosition: Track = {id:'_TRK', etype: KVLABELS.TRACKER, crc:'crc',checked:false, created:'12',org:'12',updated:'12', uid:'', trackpoint: '0', latlng: '', datetime: '0', maplink: '', radius: '0' };
    static recSize: number;
    static radius: number;

    identity: Identity;
    isUIVisible = false;
    displayedColumns = ['trackpoint', 'latlng', 'datetime', 'maplink', 'radius'];
    color: ThemePalette = 'warn';
    tracking = false;
    radius = 0.5;
    //trackStatus = false;

    tracker: Tracker;
    trackerPage: TrackerPage;

    dataSource = null;

    constructor(private _snackBar: MatSnackBar, private data: DataService, private page: PageService) {

    }
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    ngOnInit(): void {
      //this.trackMe();
      this.isUIVisible = true;
      this.data.currentIdentity.subscribe(indentity => this.identity = indentity);
      this.data.currentTracking.subscribe(tracker => this.tracker = tracker);
      this.data.recoverTracking(this.identity);
      LocationTrackerComponent.recSize = this.tracker.tracks.length;
      LocationTrackerComponent.position = this.tracker.tracks;
      LocationTrackerComponent.pointPosition = this.tracker.track;
    
      this.dataSource = new MatTableDataSource(this.tracker.tracks);
      this.sort.direction ='desc';
      this.sort.active ='trackpoint';
      this.dataSource.sort = this.sort;

      this.page.currentTrackerPage.subscribe(trackerPage => this.trackerPage = trackerPage);
   
      this.tracking = this.trackerPage.trackme;
      this.radius = this.trackerPage.trackradius;
      this.trackerPage.isUIVisible = this.isUIVisible;
      this.page.updateTrackerPage(this.trackerPage);
      LocationTrackerComponent.radius = this.radius;
    }

    ngOnDestroy(): void {
      this.isUIVisible = false;
      this.page.updateTrackerPage( this.trackerPage );
      this.tracker.track = LocationTrackerComponent.pointPosition;
      this.data.updateTracking(this.tracker);
      //this.trackMe();
    }

    setRadius(val): void {
      this.radius = val;
      this.trackerPage.trackradius = this.radius;
      this.page.updateTrackerPage(this.trackerPage);
      LocationTrackerComponent.radius = this.radius;
    }

    trackOn(): void {
      this.tracking = true;
      this.trackerPage.trackme = true;
      this.page.updateTrackerPage(this.trackerPage);
      this.trackCoords();
    }

    trackOff():void{
      this.tracking = false;
      this.trackerPage.trackme = false;
      this.page.updateTrackerPage(this.trackerPage);
      this.trackCoords();
    }

    async delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }

    dataRefresh() {
      //console.log('Called ' + this.isUIVisible   );
      if (this.isUIVisible) {
        this.tracker.tracks = LocationTrackerComponent.position;
        this.tracker.track =  LocationTrackerComponent.pointPosition;
        this.dataSource = new MatTableDataSource(this.tracker.tracks);
        this.sort.direction ='desc';
        this.sort.active ='trackpoint';
        this.dataSource.sort = this.sort;
        this.table.renderRows();
      } else {
        this.tracker.tracks = LocationTrackerComponent.position;
        this.tracker.track =  LocationTrackerComponent.pointPosition;
      }
      this.radius = LocationTrackerComponent.radius;
      //console.log(JSON.stringify(this.tracker.track));
      this.data.refreshTracking(this.tracker);
      return;
    }

    processPosition(position: any) {
      LocationTrackerComponent.pointPosition = {id:'_TRK', etype: KVLABELS.TRACKER, crc:'crc',checked:false, org: '12', created:'12',updated:'12', uid:'', trackpoint: '0', latlng: '', datetime: '0', maplink: '', radius: '0' };
      LocationTrackerComponent.pointPosition.trackpoint = ''+LocationTrackerComponent.recSize++;
      LocationTrackerComponent.pointPosition.latlng = position.coords.latitude + ',' + position.coords.longitude;
      LocationTrackerComponent.pointPosition.radius = ''+LocationTrackerComponent.radius;
      LocationTrackerComponent.pointPosition.datetime = ''+position.timestamp;
      LocationTrackerComponent.pointPosition.maplink = 'H';
      LocationTrackerComponent.position.push(LocationTrackerComponent.pointPosition);
    }
    async trackCoords(): Promise<void> {
      this.trackerPage.isTracking = !this.trackerPage.isTracking;
      this.page.updateTrackerPage(this.trackerPage);
      this.trackMe();
    }


    async trackMe(): Promise<void> {
      if (this.tracking) { 
        this.openSnackBar("Tracking","Is Now ON!"); 
      } else { 
        this.openSnackBar("Tracking","Is Now OFF!"); 
      }
      while ( this.tracking ) {
        navigator.geolocation.getCurrentPosition(
          this.processPosition
        );
        this.dataRefresh();
        this.trackerPage.isTracking = !this.trackerPage.isTracking;
        this.page.updateTrackerPage(this.trackerPage);
        await this.delay(5000);
      }
    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    }

}



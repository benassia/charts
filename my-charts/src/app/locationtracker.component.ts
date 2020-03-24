import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ThemePalette } from '@angular/material/core';
import { DataService, Tracker, Track } from './data.service';
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
    static recSize: number;
    static radius: number;
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
      this.isUIVisible = true;
      this.data.currentTracking.subscribe(tracker => this.tracker = tracker);
      //console.log ('Your Stored Tracker Is ' + JSON.stringify(this.tracker));
      LocationTrackerComponent.recSize = this.tracker.tracks.length;
      LocationTrackerComponent.position = this.tracker.tracks;
      this.dataSource = new MatTableDataSource(this.tracker.tracks);
      this.dataSource.sort = this.sort;

      this.page.currentTrackerPage.subscribe(trackerPage => this.trackerPage = trackerPage);
      this.tracking = this.trackerPage.trackme;
      this.radius = this.trackerPage.trackradius;
      LocationTrackerComponent.radius = this.radius;
    }

    ngOnDestroy(): void {
      this.isUIVisible = false;
    }

    setRadius(val): void {
      this.radius = val;
      this.trackerPage.trackradius = this.radius;
      this.page.updateTrackerPage(this.trackerPage);
      LocationTrackerComponent.radius = this.radius;
    }

    trackOnOff(): void {
      this.tracking = !this.tracking;
      this.trackerPage.trackme = this.tracking;
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
        this.dataSource = new MatTableDataSource(this.tracker.tracks);
        this.table.renderRows();
        this.dataSource.sort = this.sort;
      }
      this.radius = LocationTrackerComponent.radius;
      this.data.updateTracking(this.tracker);
      return;
    }

    processPosition(position: any) {
      const rec: Track ={trackpoint: 0, latlng: '', datetime: 0, maplink: '', radius: 0};
      rec.trackpoint = LocationTrackerComponent.recSize++;
      rec.latlng = position.coords.latitude + ',' + position.coords.longitude;
      rec.radius = LocationTrackerComponent.radius;
      rec.datetime = position.timestamp;
      rec.maplink = 'H';
      LocationTrackerComponent.position.push(rec);
    }

    async trackCoords(): Promise<void> {
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
        await this.delay(5000);
      }
    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    }

}



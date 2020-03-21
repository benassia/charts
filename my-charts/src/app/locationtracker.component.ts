import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ThemePalette } from '@angular/material/core';
import { DataService, Tracker, Track } from './data.service';
import { PageService, TrackerPage } from './page.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'locationtracker',
  templateUrl: './locationtracker.component.html',
  styleUrls: ['./locationtracker.component.css']
})
export class LocationTrackerComponent implements OnInit, OnDestroy {

    static position: Track[] = [];
    displayedColumns = ['trackpoint', 'latlng', 'datetime', 'maplink'];
    color: ThemePalette = 'warn';
    tracking = false;
    radius = 0.5;
    //trackStatus = false;

    tracker: Tracker;
    trackerPage: TrackerPage;

    dataSource = null;

    constructor(private data: DataService, private page: PageService) { }
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    ngOnInit(): void {
      this.data.currentTracking.subscribe(tracker => this.tracker = tracker);
      this.dataSource = new MatTableDataSource(this.tracker.tracks);
      this.dataSource.sort = this.sort;

      this.page.currentTrackerPage.subscribe(trackerPage => this.trackerPage = trackerPage);
      LocationTrackerComponent.position = this.tracker.tracks;
      this.tracking = this.trackerPage.trackme;
      this.radius = this.trackerPage.trackradius;
      console.log(this.tracking);
    }

    ngOnDestroy(): void {

    }

    setRadius(val): void {
      this.radius = val;
      this.trackerPage.trackradius = this.radius;
      this.page.updateTrackerPage(this.trackerPage);
    }

    trackOnOff(): void {
      this.tracking = !this.tracking;
      console.log(this.tracking);
      this.trackerPage.trackme = this.tracking;
      this.page.updateTrackerPage(this.trackerPage);
      this.trackCoords();
    }

    async delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }

    dataRefresh() {
      this.tracker.tracks = LocationTrackerComponent.position;
      this.dataSource = new MatTableDataSource(this.tracker.tracks);
      this.table.renderRows();
      this.dataSource.sort = this.sort;
      console.log(this.tracker);
      this.data.updateTracking(this.tracker);
      return;
    }

    processPosition(position: any) {
      const rec: Track ={trackpoint: 0, latlng: '', datetime: 0, maplink: '', radius: 0};
      rec.trackpoint= 12;
      rec.latlng = position.coords.latitude + ',' + position.coords.longitude;
      rec.radius = 0.5;
      rec.datetime = position.timestamp;
      rec.maplink = 'H';
      LocationTrackerComponent.position.push(rec);
    }

    async trackCoords(): Promise<void> {
      while ( this.tracking ) {
        navigator.geolocation.getCurrentPosition(
          this.processPosition
        );
        this.dataRefresh();
        await this.delay(30000);
      }
    }

}



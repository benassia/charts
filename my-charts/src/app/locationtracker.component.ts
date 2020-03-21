import { Component, OnInit, OnDestroy } from "@angular/core";
import { ThemePalette } from '@angular/material/core';
import { DataService, Tracker } from './data.service';
import { PageService, TrackerPage } from './page.service';

@Component({
  selector: 'locationtracker',
  templateUrl: './locationtracker.component.html',
  styleUrls: ['./locationtracker.component.css']
})
export class LocationTrackerComponent implements OnInit, OnDestroy {

    displayedColumns = ['trackpoint', 'latlng', 'datetime', 'maplink'];
    color: ThemePalette = 'warn';
    tracking = true;
    radius = 0.5;
    //trackStatus = false;

    tracker: Tracker;
    trackerPage: TrackerPage;

    constructor(private data: DataService, private page: PageService) { }

    ngOnInit(): void {
      this.data.currentTracking.subscribe(tracker => this.tracker = tracker);
      this.page.currentTrackerPage.subscribe(trackerPage => this.trackerPage = trackerPage);
      this.tracking = this.trackerPage.trackme;
      this.radius = this.trackerPage.trackradius;
      console.log(this.tracking);
    }

    ngOnDestroy(): void {

    }

    setRadius(val): void{
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

    processPosition(position) {
      console.log(position);
    }

    async trackCoords(): Promise<void> {
      while ( this.tracking ) {

      navigator.geolocation.getCurrentPosition(
        this.processPosition
      );
      await this.delay(30000);
      }
    }

}

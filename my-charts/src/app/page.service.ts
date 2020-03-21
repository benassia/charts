import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PageService {

  trackerPage: TrackerPage = {trackme: false, trackradius: 0.5 };

  private trackerPageHandler = new BehaviorSubject(this.trackerPage);
  currentTrackerPage = this.trackerPageHandler.asObservable();

  constructor() { }

  updateTrackerPage(trackerPage: TrackerPage) {
    this.trackerPageHandler.next(trackerPage);
  }


}

export interface TrackerPage {
  trackme: boolean;
  trackradius: number;
}

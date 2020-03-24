import { Inject,Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SESSION_STORAGE, StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { KVLABELS } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class PageService {

  trackerPage: TrackerPage = {trackme: false, trackradius: 0.5 };

  private trackerPageHandler = new BehaviorSubject(this.trackerPage);
  currentTrackerPage = this.trackerPageHandler.asObservable();

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    if ( this.storage.get( KVLABELS.TRACKERPAGE) !== undefined ){
      this.trackerPage = this.storage.get( KVLABELS.TRACKERPAGE);
    }
    this.trackerPageHandler.next(this.trackerPage);

  }

  updateTrackerPage(trackerPage: TrackerPage) {
    this.storage.set( KVLABELS.TRACKERPAGE, trackerPage);
    this.trackerPageHandler.next(trackerPage);
  }


}

export interface TrackerPage {
  trackme: boolean;
  trackradius: number;
}

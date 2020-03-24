import { Inject,Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SESSION_STORAGE, StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { KVLABELS, Track } from './data.service';

@Injectable({
  providedIn: 'root'
})

//NOTE USED AT PRESENT

export class TrackerService {
    
    static position: Track[] = [];
    static recSize: number;
    static radius: number;

    tracking = false;

  constructor() {
    this.trackCoords();
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  processPosition(position: any) {
    const rec: Track ={trackpoint: 0, latlng: '', datetime: 0, maplink: '', radius: 0};
    rec.trackpoint = TrackerService.recSize++;
    rec.latlng = position.coords.latitude + ',' + position.coords.longitude;
    rec.radius = TrackerService.radius;
    rec.datetime = position.timestamp;
    rec.maplink = 'H';
    TrackerService.position.push(rec);
  }

  async trackCoords(): Promise<void> {
    while ( this.tracking ) {
      navigator.geolocation.getCurrentPosition(
        this.processPosition
      );
      await this.delay(5000);
    }
  }


}


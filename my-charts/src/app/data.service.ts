import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class DataService {

  session: Session = {loginStatus: 'false', device: '', latlng: ''};
  tracker: Tracker = {tracks: [
                              {trackpoint: 1, latlng: 'Hydrogen', datetime: 1.0079, maplink: 'H', radius: 0.5},
                              {trackpoint: 2, latlng: 'Helium', datetime: 4.0026, maplink: 'He', radius: 0.5},
                              {trackpoint: 3, latlng: 'Lithium', datetime: 6.941, maplink: 'Li', radius: 0.5},
                              {trackpoint: 4, latlng: 'Beryllium', datetime: 9.0122, maplink: 'Be', radius: 0.5},
                              {trackpoint: 5, latlng: 'Boron', datetime: 10.811, maplink: 'B', radius: 0.5},
                              {trackpoint: 6, latlng: 'Carbon', datetime: 12.0107, maplink: 'C', radius: 0.5},
                              {trackpoint: 7, latlng: 'Nitrogen', datetime: 14.0067, maplink: 'N', radius: 0.5},
                              {trackpoint: 8, latlng: 'Oxygen', datetime: 15.9994, maplink: 'O', radius: 0.5},
                              {trackpoint: 9, latlng: 'Fluorine', datetime: 18.9984, maplink: 'F', radius: 0.5},
                              {trackpoint: 10, latlng: 'Neon', datetime: 20.1797, maplink: 'Ne', radius: 0.5}
                              ]
                            };
  observer: Observer = {observations: [
                                      {record: 1, status: 'At Work', temp: 37.8, symptom: 'Good', org: '', latlng: ''},
                                      {record: 2, status: 'At Home', temp: 37.8, symptom: 'Not Well', org: '', latlng: ''},
                                      {record: 3, status: 'Quarantined', temp: 37.8, symptom: 'Cough', org: '', latlng: ''},
                                      {record: 4, status: 'Hospitalised', temp: 39, symptom: 'Hard to Breathe', org: '', latlng: ''},
                                      {record: 5, status: 'Hospitalised', temp: 39, symptom: 'Severe', org: '', latlng: ''},
                                      {record: 6, status: 'Hospitalised', temp: 40, symptom: 'Severe', org: '', latlng: ''},
                                      {record: 7, status: 'Hospitalised', temp: 40, symptom: 'Severe', org: '', latlng: ''},
                                      {record: 8, status: 'Quarantined', temp: 37.8, symptom: 'Recovery', org: '', latlng: ''},
                                      {record: 9, status: 'At Home', temp: 37.8, symptom: 'Well', org: '', latlng: ''},
                                      {record: 10, status: 'At Work', temp: 37.8, symptom: 'Good', org: '', latlng: ''}
                                      ]
                                    };

  indentity: Identity = {name: '', email: 'you@you.com', mobile: '', device: '', uid: ''};

  private identityHandler = new BehaviorSubject(this.indentity);
  currentIdentity = this.identityHandler.asObservable();


  private observerHandler = new BehaviorSubject(this.observer);
  currentObservation = this.observerHandler.asObservable();

  private trackerHandler = new BehaviorSubject(this.tracker);
  currentTracking = this.trackerHandler.asObservable();

  private sessionHandler = new BehaviorSubject(this.session);
  currentSession = this.sessionHandler.asObservable();

  constructor() { }

  updateIdentity(indentity: Identity) {
    this.identityHandler.next(indentity);
  }

  updateObservation(observer: Observer) {
    this.observerHandler.next(observer);
  }

  updateTracking(tracker: Tracker) {
    this.trackerHandler.next(tracker);
  }

  updateSession(session: Session) {
    this.sessionHandler.next(session);
  }

}

export interface Session {
  loginStatus: string;
  device: string;
  latlng: string;
}

export interface Identity {
    name: string;
    email: string;
    mobile: string;
    device: string;
    uid: string;
}

export interface Tracker {
    tracks: Track[];
}

export interface Track {
  latlng: string;
  trackpoint: number;
  datetime: number;
  maplink: string;
  radius: number;
}


export interface Observation {
  record: number;
  status: string;
  temp: number;
  symptom: string;
  org: string;
  latlng: string;
}


export interface Observer {
  observations: Observation [];
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

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class DataService {

  position: Track[] = [];
  observation: Observation[] = [];

  session: Session = {loginStatus: 'false', device: '', latlng: ''};
  tracker: Tracker = {tracks: this.position};


  observer: Observer = {observations: [
                                      {record: 1, status: 'At Work', temp: 37.8, symptom: 'Good', latlng: ''},
                                      {record: 2, status: 'At Home', temp: 37.8, symptom: 'Not Well', latlng: ''},
                                      {record: 3, status: 'Quarantined', temp: 37.8, symptom: 'Cough', latlng: ''},
                                      {record: 4, status: 'Hospitalised', temp: 39, symptom: 'Hard to Breathe', latlng: ''},
                                      {record: 5, status: 'Hospitalised', temp: 39, symptom: 'Severe', latlng: ''},
                                      {record: 6, status: 'Hospitalised', temp: 40, symptom: 'Severe', latlng: ''},
                                      {record: 7, status: 'Hospitalised', temp: 40, symptom: 'Severe', latlng: ''},
                                      {record: 8, status: 'Quarantined', temp: 37.8, symptom: 'Recovery', latlng: ''},
                                      {record: 9, status: 'At Home', temp: 37.8, symptom: 'Well', latlng: ''},
                                      {record: 10, status: 'At Work', temp: 37.8, symptom: 'Good', latlng: ''}
                                      ]
                                    };

  indentity: Identity = {name: '', email: 'you@you.com', mobile: '', device: '', uid: '', homelatlng: 'click icon to get your location'};

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
    console.log('tracking updated');
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
    homelatlng: string;
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

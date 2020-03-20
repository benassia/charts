import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class DataService {

  session: Session = {loginStatus: 'false', device: '', latlng: ''};


  private sessionHandler = new BehaviorSubject(this.session);
  currentSession = this.sessionHandler.asObservable();

  constructor() { }

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

export interface Observation {
  status: string;
  record: number;
  temp: number;
  symptom: string;
  org: string;
  latlng: string;
}

export interface Tracker {
  latlng: string;
  trackpoint: number;
  datetime: number;
  maplink: string;
}

export interface Observations {
  chartData: [
    {
      data: Observation [];
      label: string;
    }
  ];
}

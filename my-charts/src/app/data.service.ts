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


  observer: Observer = {observations: this.observation };

  indentity: Identity = {name: '', email: 'you@you.com', sword: '', mobile: '', device: null,org: '', uid: '', homelatlng: 'click icon to get your location'};

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
    console.log(session);
    this.sessionHandler.next(session);
  }

  async registerUnsecureIdentity(identity: UnSecureIdentity): Promise <boolean> {
    console.log('registering ..');
    console.log(identity);
    await this.delay(5000);
    return Promise.resolve(true);
  }

  async loginUnsecureIdentity(identity: UnSecureIdentity): Promise <boolean> {
    console.log('logging in ..');
    console.log(identity);
    await this.delay(5000);
    return Promise.resolve(true);
  }

  async sendLoginIdentity(identity: UnSecureIdentity): Promise <boolean> {
    console.log('sending reminder ..');
    console.log(identity);
    await this.delay(5000);
    return Promise.resolve(true);
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}

export interface Session {
  loginStatus: string;
  device: string;
  latlng: string;
}

export interface UnSecureIdentity {
  orgunit: string;
  email: string;
  device: Device;
  sword: string;
  swordChk: string;
  name: string;
  mobile: string;
}

export interface Identity {
    name: string;
    email: string;
    sword: string;
    mobile: string;
    device: Device;
    org: string;
    uid: string;
    homelatlng: string;
}

export interface Device {
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  info: any;
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
  activity: string;
  temp: number;
  symptom: string;
  latlng: string;
  notes: string;
  bstate: number;
  datetime: number;
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

import { Inject,Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SESSION_STORAGE, StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { Router } from '@angular/router';


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

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) {
  
    if ( this.storage.get( KVLABELS.SESSION ) !== undefined) { 
      this.session = this.storage.get( KVLABELS.SESSION );
    }
    this.sessionHandler.next(this.session);
    //console.log('Constructor Session :: ' + JSON.stringify(this.session) );

    if ( this.storage.get( KVLABELS.TRACKER ) !== undefined ){
      this.tracker = this.storage.get( KVLABELS.TRACKER );
    }
    this.trackerHandler.next(this.tracker);
    
    if ( this.storage.get( KVLABELS.OBSERVER ) !== undefined ) {
      this.observer = this.storage.get( KVLABELS.OBSERVER );
    }
    this.observerHandler.next(this.observer);

    if ( this.storage.get( KVLABELS.IDENTITY ) !== undefined ) {
      this.indentity = this.storage.get( KVLABELS.IDENTITY );
    }
    this.identityHandler.next(this.indentity);
  }

  updateIdentity(indentity: Identity) {
    //console.log('Saving Identity :: ' + JSON.stringify(this.indentity) );
    this.storage.set( KVLABELS.IDENTITY, indentity);
    this.identityHandler.next(indentity);
  }

  updateObservation(observer: Observer) {
    //console.log('Saving Observer :: ' + JSON.stringify(this.observer) );
    this.storage.set( KVLABELS.OBSERVER, observer);
    this.observerHandler.next(observer);
  }

  updateTracking(tracker: Tracker) {
    //console.log('Saving Tracker :: ' + JSON.stringify(this.tracker) );
    this.storage.set( KVLABELS.TRACKER, tracker);
    this.trackerHandler.next(tracker);
  }

  updateSession(session: Session) {
    //console.log('Saving Session :: ' + JSON.stringify(this.session) );
    this.storage.set( KVLABELS.SESSION, session);
    this.sessionHandler.next(session);
  }

  async registerUnsecureIdentity(identity: UnSecureIdentity): Promise <boolean> {
    //console.log('Registering Unsecure Identity :: ' + JSON.stringify(identity) );
    this.storage.set( KVLABELS.REGIDENTITY, identity);
    this.createIdentity(identity);
    await this.delay(5000);
    return Promise.resolve(true);
  }

  private createIdentity(identity: UnSecureIdentity): void {
    this.indentity.sword = identity.sword;
    this.indentity.name = identity.name;
    this.indentity.email = identity.email;
    this.indentity.mobile = identity.mobile;
    this.indentity.org = identity.orgunit;
    this.indentity.device = identity.device;
    this.updateIdentity(this.indentity);

  }

  async loginUnsecureIdentity(identity: UnSecureIdentity): Promise <boolean> {
      const regID = this.storage.get( KVLABELS.IDENTITY );
      const testID = identity;
      if( testID !== undefined && regID !== undefined && testID.email === regID.email && testID.sword === regID.sword) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
     //console.log('Logging In Unsecure Identity :: ' + JSON.stringify(identity) );
     await this.delay(5000);
     return Promise.resolve(true);
  }

  async sendLoginIdentity(identity: UnSecureIdentity): Promise <boolean> {
    //console.log('Sending Login Identity :: ' + JSON.stringify(identity) );
    await this.delay(5000);
    return Promise.resolve(true);
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}

export class KVLABELS{
  static IDENTITY: string = 'IDENTITY';
  static OBSERVER: string = 'OBSERVER';
  static SESSION: string = 'SESSION';
  static TRACKER: string = 'TRACKER';
  static TRACKERPAGE: string = 'TRACKERPAGE';
  static WORLDS: string = 'WORLDS';
  static COMPYDS: string = 'COMPYDS';
  static PERNDS: string = 'PERNDS';
  static REGIDENTITY: string = 'UNSECREGID';


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

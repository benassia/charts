import { Inject,Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SESSION_STORAGE, StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
	providedIn: 'root'
})

export class DataService {

  position: Track[] = [];
  observation: Observation[] = [];

  session: Session = {loginStatus: 'false', device: '', latlng: ''};
  tracker: Tracker = {tracks: this.position};


  observer: Observer = {observations: this.observation };

  checked: boolean;
  created: string;
  updated: string;


  indentity: Identity = {id:'id', etype:'etype', crc:'crc', checked:false, created:'12',updated:'12', uid: '12',name: '12', email: 'you@you.com', sword: '12', mobile: '12', device: null,org: '12', homelatlng: 'click icon to get your location'};

  private identityHandler = new BehaviorSubject(this.indentity);
  currentIdentity = this.identityHandler.asObservable();


  private observerHandler = new BehaviorSubject(this.observer);
  currentObservation = this.observerHandler.asObservable();

  private trackerHandler = new BehaviorSubject(this.tracker);
  currentTracking = this.trackerHandler.asObservable();

  private sessionHandler = new BehaviorSubject(this.session);
  currentSession = this.sessionHandler.asObservable();

  private apiEndpoint: String;
  private httpOptions: any;

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) {
    this.initService();
    this.apiEndpoint = environment.api.covid19;

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
  
  public initService() {
    this.setHeaders();
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
    console.log('Registering Unsecure Identity :: ' + JSON.stringify(identity) );
    this.storage.set( KVLABELS.REGIDENTITY, identity);
    return this.createIdentity(identity);
  }

  async refreshSecureIdentity(identity: Identity): Promise <boolean>{
    console.log('Registering Unsecure Identity :: ' + JSON.stringify(identity) );
    return this.refreshIdentity(identity);
  }

  async loginUnsecureIdentity(identity: UnSecureIdentity): Promise <boolean> {
      return await this.loginIdentity(identity);
     //console.log('Logging In Unsecure Identity :: ' + JSON.stringify(identity) );
  }

  async sendLoginIdentity(identity: UnSecureIdentity): Promise <boolean> {
    //console.log('Sending Login Identity :: ' + JSON.stringify(identity) );
    await this.delay(5000);
    return Promise.resolve(true);
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

 private setHeaders() {
    console.log("setting headers");
    //let token = this.currentSession.idToken.jwtToken;
    // tslint:disable-next-line:indent
		this.httpOptions = {
      headers: new HttpHeaders({
        // 'Authorization': token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : '*',
        'Access-Control-Allow-Headers' : '*'
			}),
		};
  }

  async refreshIdentity(identity: Identity): Promise<boolean> {

    let result: boolean;
    this.initService();

    console.log('the object in \n' + JSON.stringify(identity));

    let c_url = `${this.apiEndpoint}/todo/${identity.id}`;
    console.log('URL To Call ' + c_url);

    const id = await this.http.put(c_url, identity, this.httpOptions).toPromise() as unknown as Identity;
    if ( id.id === identity.email) {
      this.updateIdentity(id);
      result = true;
    }

    return Promise.resolve(true);
  }


  async loginIdentity(identity: UnSecureIdentity): Promise<boolean> {

    let result = false;
    this.initService();

    console.log('the object in \n' + JSON.stringify(identity));

    let c_url = `${this.apiEndpoint}/login`;
    console.log('URL To Call ' + c_url);

    const id = await this.http.post(c_url, identity, this.httpOptions).toPromise() as unknown as Identity;
    if ( id.id === identity.email) {
      this.updateIdentity(id);
      result = true;
    }

    return Promise.resolve(true);
  }


  async createIdentity(identity: UnSecureIdentity): Promise<boolean> {
    this.indentity = {id:'id', etype:'etype', crc:'crc', checked:false, created:'12',updated:'12', uid: '12',name: '12', email: 'you@you.com', sword: '12', mobile: '12', device: {isDesktop:false, isMobile:false, isTablet:true, info:"y"} ,org: '12', homelatlng: 'click icon to get your location'};

    this.indentity.sword = identity.sword;
    this.indentity.name = identity.name;
    this.indentity.email = identity.email;
    this.indentity.mobile = identity.mobile;
    this.indentity.org = identity.orgunit;
    this.indentity.device = identity.device;

    let result = false;
    this.initService();

    console.log('the object in \n' + JSON.stringify(this.indentity));

    let c_url = `${this.apiEndpoint}/todo`;
    console.log('URL To Call ' + c_url);

    const id = await this.http.post(c_url, this.indentity, this.httpOptions).toPromise() as unknown as Identity;
    if ( id.id === this.indentity.email) {
      result = true;
    }
    return Promise.resolve(result);
  }



  async getObservations(identity: Identity): Promise<Observer> {
		// await this.setHttpOptions(); //need to find a way to fix this
		const data = await this.http.post(`${this.apiEndpoint}/observations`, identity, this.httpOptions).toPromise() as unknown as Observer;
		return data;
  }
  
  async saveObservation(observer: Observer): Promise<Observer> {
		// await this.setHttpOptions(); //need to find a way to fix this
		const data = await this.http.post(`${this.apiEndpoint}/observation`, observer, this.httpOptions).toPromise() as unknown as Observer;
		return data;
  }

  async getTracks(identity: Identity): Promise<Tracker> {
		// await this.setHttpOptions(); //need to find a way to fix this
		const data = await this.http.post(`${this.apiEndpoint}/tracks`, identity, this.httpOptions).toPromise() as unknown as Tracker;
		return data;
  }
  
  async saveTrack(track: Track): Promise<Track> {
		// await this.setHttpOptions(); //need to find a way to fix this
		const data = await this.http.post(`${this.apiEndpoint}/track`, track, this.httpOptions).toPromise() as unknown as Track;
		return data;
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
    id: string;
    etype: string;
    crc: string;
    uid: string;
    name: string;
    email: string;
    sword: string;
    mobile: string;
    device: Device;
    org: string;
    homelatlng: string;
    checked: boolean;
    created: string;
    updated: string;
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
  id: string;
  etype: string;
  crc: string;
  uid: string;
  latlng: string;
  trackpoint: number;
  datetime: number;
  maplink: string;
  radius: number;
  checked: boolean;
  created: string;
  updated: string;
}


export interface Observation {
  id: string;
  etype: string;
  crc: string;
  uid: string;
  record: number;
  status: string;
  activity: string;
  temp: number;
  symptom: string;
  latlng: string;
  notes: string;
  bstate: number;
  datetime: number;
  checked: boolean;
  created: string;
  updated: string;
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

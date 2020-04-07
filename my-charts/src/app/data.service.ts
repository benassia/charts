import { Inject,Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SESSION_STORAGE, StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Md5} from 'ts-md5/dist/md5';
import { EncrDecrService } from './encr-decr.service';



@Injectable({
	providedIn: 'root'
})

export class DataService {

  position: Track[] = [];
  pointPosition: Track =  {id:'_TRK', etype: KVLABELS.TRACKER, crc:'crc',checked:false, created:'12',updated:'12', uid:'', trackpoint: '0', latlng: '', datetime: '0', maplink: '', radius: '0' };
  
  observation: Observation[] = [];
  pointObservation: Observation = {id:'_OBS', etype:KVLABELS.OBSERVER, crc:'crc', uid:'12',record: '12', activity: 'At Work', status: 'Fine', temp: '2', symptom: 'None', notes: 'notes', latlng: '12', bstate: '1', datetime: '0',checked:false, created:'12', updated:'12'};
  
  session: Session = {loginStatus: 'false', device: '', latlng: ''};
  tracker: Tracker = {tracks: this.position, track: this.pointPosition};


  observer: Observer = {observations: this.observation, observation: this.pointObservation };

  checked: boolean;
  created: string;
  updated: string;


  indentity: Identity = {id:'id', etype: KVLABELS.IDENTITY, crc:'crc', checked:false, created:'12',updated:'12', uid: '12',name: '12', email: 'you@you.com', sword: '12', mobile: '12', device: null,org: '12', homelatlng: 'click icon to get your location'};

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

  constructor(private EncrDecr: EncrDecrService, private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) {
    this.initService();
    this.apiEndpoint = environment.api.covid19;

    if ( this.storage.get( KVLABELS.SESSION ) !== undefined) { 
      this.session = this.storage.get( KVLABELS.SESSION );
    }
    this.sessionHandler.next(this.session);
    ////////////console.log('Constructor Session :: ' + JSON.stringify(this.session) );

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
    //////////console.log('Saving Identity :: ' + JSON.stringify(this.indentity) );
    this.storage.set( KVLABELS.IDENTITY, indentity);
    this.identityHandler.next(indentity);
  }

  updateObservation(observer: Observer) {
    ////////console.log('Saving Observer :: ' + JSON.stringify(this.observer) );

    this.storage.set( KVLABELS.OBSERVER, observer);
    this.observerHandler.next(observer);
  }

  updateTracking(tracker: Tracker) {
    ////////console.log('Saving Tracker :: ' + JSON.stringify(this.tracker) );
    this.storage.set( KVLABELS.TRACKER, tracker);
    this.trackerHandler.next(tracker);
  }

  updateSession(session: Session) {
    ////////console.log('Saving Session :: ' + JSON.stringify(this.session) );
    this.storage.set( KVLABELS.SESSION, session);
    this.sessionHandler.next(session);
  }

  async registerUnsecureIdentity(identity: UnSecureIdentity): Promise <boolean> {
    //////console.log('Registering Unsecure Identity :: ' + JSON.stringify(identity) );
    //this.storage.set( KVLABELS.REGIDENTITY, identity);
    return this.createIdentity(identity);
  }

  async refreshSecureIdentity(identity: Identity): Promise <boolean>{
    //////console.log('Registering Unsecure Identity :: ' + JSON.stringify(identity) );
    return this.refreshIdentity(identity);
  }

  async loginUnsecureIdentity(identity: UnSecureIdentity): Promise <boolean> {
       ////console.log('Logging In Unsecure Identity :: ' + JSON.stringify(identity) );
      return await this.loginIdentity(identity);
  
  }

  async refreshTracking(tracker: Tracker): Promise <boolean> {
    return await this.trackIdentity(tracker);
   ////////console.log('Logging In Unsecure Identity :: ' + JSON.stringify(identity) );
  }

  async refreshObservation(observer: Observer): Promise <boolean> {
    return await this.observeIdentity(observer);
   ////////console.log('Logging In Unsecure Identity :: ' + JSON.stringify(identity) );
  }

  async sendLoginIdentity(identity: UnSecureIdentity): Promise <boolean> {
    ////////console.log('Sending Login Identity :: ' + JSON.stringify(identity) );
    return await this.remindIdentity(identity);
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

 private setHeaders() {
    //////console.log("setting headers");
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

  private createCRC(input: string): string {
    const crc: string = Md5.hashStr(input + 'yabba').toString();
    return crc;
  }

  private handleError(input: string): void {

  }

  async remindIdentity(identity: UnSecureIdentity): Promise<boolean> {

    let result: boolean = false;
    this.initService();

    let reminder: ForgotMessage = {"crc":"","email":"","mobile":"","sword":""}

    reminder.mobile = identity.mobile;
    reminder.crc = this.createCRC(identity.mobile);

    //////console.log('the object in \n' + JSON.stringify(reminder));

    let c_url = `${this.apiEndpoint}/forgot`;
    //////console.log('URL To Call ' + c_url);

    const id = await this.http.post(c_url, reminder, this.httpOptions).toPromise()
      .then(response1 => {
        const e_payload: CommsMessage = {"email":"12","subject":"12","text_message":"12","html_message":"12","crc":"12"};
        const sword = this.EncrDecr.get('123456$#@$^@1ERF', response1['sword']);
        e_payload.email = response1['email'];
        e_payload.subject = 'C19 Reminder';
        e_payload.text_message = 'Your reminder detail is ' + sword;
        e_payload.html_message = '<p> Your reminder detail is <hr>' + sword;
        e_payload.crc = this.createCRC(response1['email']);   
        this.sendMail(e_payload);
        result = true;
      })
      .catch(error => {

       }) as unknown as ForgotMessage;
    return Promise.resolve(result);
  }

  async observeIdentity(observer: Observer): Promise<boolean> {

    let result: boolean = false;
    this.initService();
    const identity: Identity =  this.storage.get( KVLABELS.IDENTITY);
    observer.observation.uid = identity.uid;
    observer.observation.id = identity.uid + "_OBS_" + observer.observation.record;
    observer.observation.crc = this.createCRC(observer.observation.uid);

    //////console.log('the object in \n' + JSON.stringify(observer.observation));

    let c_url = `${this.apiEndpoint}/observation`;
    //////console.log('URL To Call ' + c_url);

    const id = await this.http.post(c_url, observer.observation, this.httpOptions).toPromise() as unknown as Observation;
    observer.observation = id;
    this.updateObservation(observer);
    result = true;

    return Promise.resolve(true);
  }

  async trackIdentity(tracker: Tracker): Promise<boolean> {

    let result: boolean = false;
    this.initService();
    const identity: Identity =  this.storage.get( KVLABELS.IDENTITY);
    tracker.track.uid = identity.uid;
    tracker.track.id = identity.uid + "_TRK_" + tracker.track.trackpoint;
    tracker.track.crc = this.createCRC(tracker.track.uid);

    //////console.log('the object in \n' + JSON.stringify(tracker.track));

    let c_url = `${this.apiEndpoint}/track`;
    //////console.log('URL To Call ' + c_url);

    const id = await this.http.post(c_url, tracker.track, this.httpOptions).toPromise() as unknown as Track;
    tracker.track = id;
    this.updateTracking(tracker);
    result = true;

    return Promise.resolve(true);
  }

  async refreshIdentity(identity: Identity): Promise<boolean> {

    let result: boolean;
    this.initService();

    identity.crc = this.createCRC(identity.uid);

    //////console.log('the object in \n' + JSON.stringify(identity));

    let c_url = `${this.apiEndpoint}/todo`;
    //////console.log('URL To Call ' + c_url);

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

    identity.crc = this.createCRC(identity.email);

    ////console.log('the object in \n' + JSON.stringify(identity));

    let c_url = `${this.apiEndpoint}/login`;
    //////console.log('URL To Call ' + c_url);

    const id = await this.http.post(c_url, identity, this.httpOptions).toPromise() as unknown as Identity;
    ////console.log('the object in \n' + JSON.stringify(id.id));
    if ( id.id === identity.email) {
        this.updateIdentity(id);
        result = true;
    }
    return Promise.resolve(result);
  }


  async createIdentity(identity: UnSecureIdentity): Promise<boolean> {
    this.indentity = {id:'id', etype: KVLABELS.IDENTITY, crc:'crc', checked:false, created:'12',updated:'12', uid: '12',name: '12', email: 'you@you.com', sword: '12', mobile: '12', device: {isDesktop:false, isMobile:false, isTablet:true, info:"y"} ,org: '12', homelatlng: 'click icon to get your location'};

    this.indentity.sword = identity.sword;
    this.indentity.name = identity.name;
    this.indentity.email = identity.email;
    this.indentity.mobile = identity.mobile;
    this.indentity.org = identity.orgunit;
    this.indentity.device = identity.device;
    this.indentity.uid = identity.email;
    
    this.indentity.crc = this.createCRC(this.indentity.uid);

    let result = false;
    this.initService();

    //////console.log('the object in \n' + JSON.stringify(this.indentity));
    
    let c_url = `${this.apiEndpoint}/todo`;
    
    //////console.log('URL To Call ' + c_url);

    const id = await this.http.post(c_url, this.indentity, this.httpOptions).toPromise() as unknown as Identity;

    if ( id.email === 'ERROR@ERROR.ERROR'){
      return Promise.resolve(result);
    }

    if ( id.id === this.indentity.email) {

      const e_payload: CommsMessage = {"email":"12","subject":"12","text_message":"12","html_message":"12","crc":"12"};
      e_payload.email = id.id;
      e_payload.subject = 'C19 Registration Verification';
      e_payload.text_message = 'Your email has been used to register with C19 Tracker';
      e_payload.html_message = '<p> Your email has been used to register with C19 Tracker <hr>';
      e_payload.crc = this.createCRC(id.id);

      await this.sendMail(e_payload);
      result = true;
    }

    return Promise.resolve(result);
  }

  async sendMail(e_payload: CommsMessage): Promise<boolean> {
  
    let result = false;
    this.initService();
   
    let e_url = `${this.apiEndpoint}/sendmail`;

    //////console.log("EMAIL MESSAGE IS \n" + JSON.stringify(e_payload));
    
    const comms = await this.http.post(e_url, e_payload, this.httpOptions).toPromise() as unknown as CommsACK;

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
  crc: string;
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
    track: Track;
}

export interface Track {
  id: string;
  etype: string;
  crc: string;
  uid: string;
  latlng: string;
  trackpoint: string;
  datetime: string;
  maplink: string;
  radius: string;
  checked: boolean;
  created: string;
  updated: string;
}


export interface Observation {
  id: string;
  etype: string;
  crc: string;
  uid: string;
  record: string;
  status: string;
  activity: string;
  temp: string;
  symptom: string;
  latlng: string;
  notes: string;
  bstate: string;
  datetime: string;
  checked: boolean;
  created: string;
  updated: string;
}


export interface Observer {
  observations: Observation [];
  observation: Observation;
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

export interface CommsACK {
  error: boolean;
  message: string;
}

export interface CommsMessage {
  email: string;
  subject: string;
  text_message: string;
  html_message: string;
  crc: string;
}

export interface ForgotMessage {
  crc: string;
  mobile: string;
  email: string;
  sword: string;
}

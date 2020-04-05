import {ChangeDetectionStrategy, Component, OnInit, Inject, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DataService, Session, UnSecureIdentity, Device } from './data.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageService, TrackerPage } from './page.service';
import { DOCUMENT } from '@angular/common';
import { NgxAutoScroll } from 'ngx-auto-scroll';


@Component({
  selector: 'unsecure-root',
  templateUrl: './unsecure.component.html',
  styleUrls: ['./unsecure.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UnSecureAppComponent  implements OnInit {

  @ViewChild(NgxAutoScroll, {static: true}) ngxAutoScroll: NgxAutoScroll;
  
  pageState = 'login';
  session: Session = {loginStatus: '', device: '', latlng: ''};
  unSecureRegIdentity: UnSecureIdentity = { crc: '', orgunit: '', email: '', device: null , sword: '', swordChk: '', name: '', mobile: ''};
  unSecureLogIdentity: UnSecureIdentity = { crc: '', orgunit: '', email: '', device: null , sword: '', swordChk: '', name: '', mobile: ''};
  unSecureForgotIdentity: UnSecureIdentity = { crc: '', orgunit: '', email: '', device: null , sword: '', swordChk: '', name: '', mobile: ''};
  
  trackerPage: TrackerPage = {trackme: false, trackradius: 0.5, isUIVisible: false, isTracking: true };
  
  device: Device = { isMobile: false, isDesktop: false, isTablet: false, info: null };

  hide = true;
  chide = true;

  showBuffer = false;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'buffer';
  value = 60;
  bufferValue = 95;
  elem;
  constructor(private _snackBar: MatSnackBar,private page: PageService, private data: DataService, private deviceService: DeviceDetectorService, private router: Router, @Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
    this.elem = document.documentElement;
    //this.openFullscreen();
    this.data.currentSession.subscribe(session => this.session = session);
    this.page.currentTrackerPage.subscribe(trackerPage => this.trackerPage = trackerPage);
    
    this.epicFunction();
    //console.log('unsecure');
  }

  epicFunction() {
    this.device.info = this.deviceService.getDeviceInfo();
    this.device.isMobile = this.deviceService.isMobile();
    this.device.isTablet = this.deviceService.isTablet();
    this.device.isDesktop = this.deviceService.isDesktop();
    this.unSecureRegIdentity.device = this.device;
    this.unSecureLogIdentity.device = this.device;
    this.unSecureForgotIdentity.device = this.device;

  }
  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
  
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  mobileFormControl = new FormControl('', [
    Validators.required,
  ]);

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);


  openHome(): void {

  }
  async login(): Promise<void> {
   
    if ( this.pageState === 'login' ) {
      if ( !this.validateLogin(this.unSecureLogIdentity)) {
        this.openSnackBar("Login","Error with Data!");
        return;
      }
      this.showBuffer = true;
      this.session.loginStatus = '' + await this.data.loginUnsecureIdentity(this.unSecureLogIdentity);
      //this.session.loginStatus = 'true';
      this.data.updateSession(this.session);
      this.showBuffer = false;
      if ( this.session.loginStatus === 'true' ) {
        this.openSnackBar("Login","Successful!");
        //this.router.navigate(['/secure']);
      }
      else {
        this.openSnackBar("Login","Failed Please Check Details!");
      }
    }
    this.pageState = 'login';
  }

  forgotLogin(): void {
    this.pageState = 'forgotLogin';
  }

  async registerLogin(): Promise<void> {
    if ( this.pageState === 'registerLogin' ) {
      if(this.validateRegistration(this.unSecureRegIdentity)) {
        this.showBuffer = true;
        if( await this.data.registerUnsecureIdentity(this.unSecureRegIdentity )){
          //this.pageState = 'login';
          this.showBuffer = false;
          this.openSnackBar("Regsitration","Securely Accepted!");  
        } else {
          this.showBuffer = false;
          this.openSnackBar("Regsitration","Failed, Have You Registered Already!"); 
        }
      } else {
          this.openSnackBar("Regsitration","Failed Missing Data!"); 
      }
    } else {
      this.pageState = 'registerLogin';
    }
  }

  validateRegistration(identity: UnSecureIdentity): boolean {
    //console.log (JSON.stringify(identity));
    let test = false;
    if (identity.orgunit.length <=0 ) return test; 
    if (identity.email.length <=0) return test; 
    if (identity.device===null ) return test; 
    if (identity.sword.length <=0  ) return test; 
    if (identity.swordChk.length <=0 ) return test; 
    if (identity.name.length <=0 ) return test; 
    if (identity.mobile.length <=0 ) return test; 
    test = true;
    return test;
  }

  validateLogin(identity: UnSecureIdentity): boolean {
    //console.log (JSON.stringify(identity));
    let test = false;
    if (identity.email.length <=0) return test; 
    if (identity.device===null ) return test; 
    if (identity.sword.length <=0  ) return test; 
    test = true;
    return test;
  }

  async sendLoginReminder(): Promise<void> {
    this.showBuffer = true;
    if ( await this.data.sendLoginIdentity(this.unSecureForgotIdentity)){
      this.openSnackBar("Reminder","Has Been Sent!"); 
      //this.pageState = 'login';
    } else {
      this.openSnackBar("Reminder","Failed: Please Try Again!"); 
    }

  }

  openSnackBar(message: string, action: string) {
    this.showBuffer = false;
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
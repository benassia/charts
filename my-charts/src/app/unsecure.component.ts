import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DataService, Session, UnSecureIdentity, Device } from './data.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'unsecure-root',
  templateUrl: './unsecure.component.html',
  styleUrls: ['./unsecure.component.css']
})

export class UnSecureAppComponent  implements OnInit {

  pageState = 'login';
  session: Session = {loginStatus: '', device: '', latlng: ''};
  unSecureRegIdentity: UnSecureIdentity = { orgunit: '', email: '', device: null , sword: '', swordChk: '', name: '', mobile: ''};
  unSecureLogIdentity: UnSecureIdentity = { orgunit: '', email: '', device: null , sword: '', swordChk: '', name: '', mobile: ''};
  unSecureForgotIdentity: UnSecureIdentity = { orgunit: '', email: '', device: null , sword: '', swordChk: '', name: '', mobile: ''};
  
  
  device: Device = { isMobile: false, isDesktop: false, isTablet: false, info: null };

  hide = true;
  chide = true;

  showBuffer = false;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'buffer';
  value = 60;
  bufferValue = 95;

  constructor(private _snackBar: MatSnackBar, private data: DataService, private deviceService: DeviceDetectorService, private router: Router) { }

  ngOnInit(): void {
    this.data.currentSession.subscribe(session => this.session = session);
    this.epicFunction();
    console.log('unsecure');
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
      this.showBuffer = true;
      this.session.loginStatus = '' + await this.data.loginUnsecureIdentity(this.unSecureLogIdentity);
      //this.session.loginStatus = 'true';
      this.data.updateSession(this.session);
      this.showBuffer = false;
      if ( this.session.loginStatus === 'true' ) {
        this.openSnackBar("Login","Successful!");
        this.router.navigate(['/secure']);
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
      this.showBuffer = true;
      if( await this.data.registerUnsecureIdentity(this.unSecureRegIdentity )){
        this.showBuffer = false;
        this.pageState = 'login';
        this.openSnackBar("Regsitration","Securely Accepted!");  
      }else {
        this.showBuffer = false;
        this.openSnackBar("Regsitration","Failed, Have You Registered Already!"); 
      }
      
      
      
    } else {
      this.pageState = 'registerLogin';
    }
  }

  async sendLoginReminder(): Promise<void> {
    this.showBuffer = true;
    if( await this.data.sendLoginIdentity(this.unSecureForgotIdentity)){
      this.showBuffer = false;
      this.openSnackBar("Reminder","Has Been Sent!"); 
      this.pageState = 'login';
    } else {
      this.showBuffer = false;
      this.openSnackBar("Reminder","Failed: Please Try Again!"); 
    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
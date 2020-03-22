import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DataService, Session, UnSecureIdentity, Device } from './data.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';

@Component({
  selector: 'unsecure-root',
  templateUrl: './unsecure.component.html',
  styleUrls: ['./unsecure.component.css']
})

export class UnSecureAppComponent  implements OnInit {

  pageState = 'login';
  session: Session = {loginStatus: '', device: '', latlng: ''};
  unSecureIdentity: UnSecureIdentity = { orgunit: '', email: '', device: null , sword: '', swordChk: '', name: '', mobile: ''};
  device: Device = { isMobile: false, isDesktop: false, isTablet: false, info: null };

  hide = true;
  chide = true;

  showBuffer = false;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'buffer';
  value = 60;
  bufferValue = 95;

  constructor(private data: DataService, private deviceService: DeviceDetectorService, private router: Router) { }

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
    this.unSecureIdentity.device = this.device;
    console.log(this.unSecureIdentity.device);
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
      this.session.loginStatus = '' + await this.data.loginUnsecureIdentity(this.unSecureIdentity);
      //this.session.loginStatus = 'true';
      this.data.updateSession(this.session);
      this.showBuffer = false;
      if ( this.session.loginStatus === 'true' ) {
        this.router.navigate(['/secure']);
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
      await this.data.registerUnsecureIdentity(this.unSecureIdentity);
      this.pageState = 'login';
      this.showBuffer = false;
    } else {
      this.pageState = 'registerLogin';
    }
  }

  async sendLoginReminder(): Promise<void> {
    this.showBuffer = true;
    await this.data.sendLoginIdentity(this.unSecureIdentity);
    this.showBuffer = false;
    this.pageState = 'login';
  }

}


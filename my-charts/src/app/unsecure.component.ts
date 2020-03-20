import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DataService, Session } from "./data.service";

@Component({
  selector: 'unsecure-root',
  templateUrl: './unsecure.component.html',
  styleUrls: ['./unsecure.component.css']
})

export class UnSecureAppComponent  implements OnInit {

  pageState = 'login';
  session: Session = {loginStatus: '', device: '', latlng: ''};

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.currentSession.subscribe(session => this.session = session);
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

  openHome():void{

  }
  login():void{
    this.pageState = 'login';
    this.session.loginStatus = 'true';
    this.data.updateSession(this.session);
  }
  forgotLogin():void{
    this.pageState='forgotLogin';
    
  }
  registerLogin():void{
    this.pageState='registerLogin';
    
  }
  sendLoginReminder():void{
    this.pageState='login';
  }
}  

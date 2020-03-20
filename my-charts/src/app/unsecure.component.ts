import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DataService } from "./data.service";

@Component({
  selector: 'unsecure-root',
  templateUrl: './unsecure.component.html',
  styleUrls: ['./unsecure.component.css']
})

export class UnSecureAppComponent  implements OnInit {

  pageState = 'login';
  loginStatus: string;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(loginStatus => this.loginStatus = loginStatus);
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
    this.data.changeMessage('true');

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

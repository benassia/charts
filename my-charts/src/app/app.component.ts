import { Component, OnInit, Inject} from '@angular/core';
import { DataService, Session } from "./data.service";
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  elem;
  session: Session = {loginStatus: '', device: '', latlng: ''};
  constructor(private data: DataService, private router: Router, @Inject(DOCUMENT) private document: any) { 

  }
  


  ngOnInit() {
    this.elem = document.documentElement;
    this.openFullscreen();
    this.data.currentSession.subscribe(session => this.session = session);
    //console.log ("This is the session app.componnet " + JSON.stringify(this.session));
    if ( this.session.loginStatus === 'true') {
      this.router.navigate(['/secure']);
    } else {
      this.router.navigate(['/unsecure']);
    }
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

}


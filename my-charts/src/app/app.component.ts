import { Component, OnInit} from '@angular/core';
import { DataService, Session } from "./data.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  session: Session = {loginStatus: '', device: '', latlng: ''};

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.currentSession.subscribe(session => this.session = session);
    //console.log ("This is the session app.componnet " + JSON.stringify(this.session));
    if ( this.session.loginStatus === 'true') {
      this.router.navigate(['/secure']);
    } else {
      this.router.navigate(['/unsecure']);
    }
  }

}
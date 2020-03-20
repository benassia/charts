import { Component, OnInit} from '@angular/core';
import { DataService, Session } from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  session: Session = {loginStatus: '', device: '', latlng: ''};

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentSession.subscribe(session => this.session = session);
  }

}
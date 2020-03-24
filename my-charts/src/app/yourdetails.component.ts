import { Component, OnInit, OnDestroy } from "@angular/core";
import {ThemePalette} from '@angular/material/core'; 
import {ProgressBarMode} from '@angular/material/progress-bar';
import { DataService, Identity } from './data.service';


@Component({
	selector: 'yourdetails',
	templateUrl: './yourdetails.component.html',
	styleUrls: ['./yourdetails.component.css']
})
export class YourDetailsComponent implements OnInit, OnDestroy {
    
    static ypos: string;

    showBuffer = false;
    color: ThemePalette = 'primary';
    mode: ProgressBarMode = 'buffer';
    value = 60;
    bufferValue = 95;

    hide = false;

    identity: Identity;

    constructor(private data: DataService) { }

    ngOnInit(): void {
        this.data.currentIdentity.subscribe(identity => this.identity = identity);
        console.log ('Your Stored Identity Is ' + JSON.stringify(this.identity));
    }

    ngOnDestroy(): void {
    }
    
    async delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    processPosition(position: any) {
        const pos =  position.coords.latitude + ',' + position.coords.longitude;
        YourDetailsComponent.ypos = pos;
    }

    async getMyLocation(): Promise<void> {
        this.showBuffer = true;
        navigator.geolocation.getCurrentPosition(
            this.processPosition
        );
        await this.delay(5000);
        this.showBuffer = false;
        this.identity.homelatlng = YourDetailsComponent.ypos;
        this.data.updateIdentity(this.identity);
    }

    deleteAllMyData(): void
    {
        this.showBuffer = true;
        this.showBuffer = false;
    }

}
import { Component, OnInit, OnDestroy } from "@angular/core";
import {ThemePalette} from '@angular/material/core'; 
import {ProgressBarMode} from '@angular/material/progress-bar';
import { DataService, Identity } from './data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

    constructor(private _snackBar: MatSnackBar, private data: DataService) { }

    ngOnInit(): void {
        this.data.currentIdentity.subscribe(identity => this.identity = identity);
        this.readLocation();
        this.showBuffer = false;
        //console.log ('Your Stored Identity Is ' + JSON.stringify(this.identity));
    }

    ngOnDestroy(): void {
    }
    
    async delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    processPosition(position: any) {
        const pos =  position.coords.latitude + ',' + position.coords.longitude;
        YourDetailsComponent.ypos = pos;
        console.log("FERE IS RHE " + YourDetailsComponent.ypos)
    }

    async getMyLocation(): Promise<void> {
        if ( await this.readLocation()) {
            this.identity.homelatlng = YourDetailsComponent.ypos;
            console.log( 'here is the latlang\n' + this.identity.homelatlng )
            if (await this.data.refreshSecureIdentity(this.identity)) {
                this.showBuffer = false;
                this.openSnackBar("Home Location", "Securely Recorded!");
            } else {
                this.showBuffer = false;
                this.openSnackBar("Home Location", "Error In Recording Position!");
            }
        }
    }

    async readLocation(): Promise<boolean> {
        this.showBuffer = true;
        navigator.geolocation.getCurrentPosition(
            this.processPosition
        );
        return true;
    }



    deleteAllMyData(): void
    {
        this.showBuffer = true;
        this.showBuffer = false;
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 2000,
        });
      }

}
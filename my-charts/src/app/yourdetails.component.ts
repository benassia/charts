import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {ThemePalette} from '@angular/material/core'; 
import {ProgressBarMode} from '@angular/material/progress-bar';
import { DataService, Identity } from './data.service';


@Component({
	selector: 'yourdetails',
	templateUrl: './yourdetails.component.html',
	styleUrls: ['./yourdetails.component.css']
})
export class YourDetailsComponent implements OnInit, OnDestroy {
    showBuffer = false;
    color: ThemePalette = 'primary';
    mode: ProgressBarMode = 'buffer';
    value = 60;
    bufferValue = 95;

    identity: Identity;

    constructor(private data: DataService) { }

    ngOnInit(): void {
        this.data.currentIdentity.subscribe(identity => this.identity = identity);
    }
    
    ngOnDestroy(): void {
        
    }

    deleteAllMyData(): void
    {
        this.showBuffer = true;
        this.showBuffer = false;
    }

}
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {ThemePalette} from '@angular/material/core'; 
import {ProgressBarMode} from '@angular/material/progress-bar';


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

    ngOnInit(): void {
       
    }
    
    ngOnDestroy(): void {
        
    }

    deleteAllMyData(): void
    {
        this.showBuffer = true;
        this.showBuffer = false;
    }

}
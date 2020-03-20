import { Component, Inject, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
	selector: 'dayobservations',
	templateUrl: './dayobservations.component.html',
	styleUrls: ['./dayobservations.component.css']
})
export class DayObservationsComponent implements OnInit, OnDestroy {

    displayedColumns = ['record', 'status', 'temp', 'symptom'];
    dataSource = ELEMENT_DATA;
    
    animal: string;
    name: string;

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {
      //const ndata = {position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H'};
      //this.dataSource.push(ndata);
    }
    
    ngOnDestroy(): void {
        
    }



    openGood(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '250px',
        data: {record: 11, status: 'At Work', temp: 37.8, symptom: 'None'}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        alert(JSON.stringify(result));
        this.dataSource.push(result);
      });
    }
    openC19Q():void{
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog1, {
        width: '250px',
        data: {record: 12, status: 'Quarantined', temp: 39, symptom: 'Cough & Breath'}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.dataSource.push(result);
      });
    }
    openC19A():void{
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog2, {
        width: '250px',
        data: {record: 13, status: 'Hospitalised', temp: 90, symptom: 'Severe'}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.dataSource.push(result);
      });
    }
    openC19S():void{
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog3, {
        width: '250px',
        data: {record: 14, status: 'Recovering', temp: 37.8, symptom: 'Exhuasted'}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.dataSource.push(result);
      });
    }
}

@Component({
  selector: 'goodhealthrecord',
  templateUrl: 'goodhealthrecord.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: HObservation) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'c19qhealthrecord',
  templateUrl: 'c19qhealthrecord.html',
})
export class DialogOverviewExampleDialog1 {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog1>,
    @Inject(MAT_DIALOG_DATA) public data: HObservation) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'c19ahealthrecord',
  templateUrl: 'c19ahealthrecord.html',
})
export class DialogOverviewExampleDialog2 {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog2>,
    @Inject(MAT_DIALOG_DATA) public data: HObservation) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'c19shealthrecord',
  templateUrl: 'c19shealthrecord.html',
})
export class DialogOverviewExampleDialog3 {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog3>,
    @Inject(MAT_DIALOG_DATA) public data: HObservation) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


const ELEMENT_DATA: HObservation[] = [
  {record: 1, status: 'At Work', temp: 37.8, symptom: 'Good'},
  {record: 2, status: 'At Home', temp: 37.8, symptom: 'Not Well'},
  {record: 3, status: 'Quarantined', temp: 37.8, symptom: 'Cough'},
  {record: 4, status: 'Hospitalised', temp: 39, symptom: 'Hard to Breathe'},
  {record: 5, status: 'Hospitalised', temp: 39, symptom: 'Severe'},
  {record: 6, status: 'Hospitalised', temp: 40, symptom: 'Severe'},
  {record: 7, status: 'Hospitalised', temp: 40, symptom: 'Severe'},
  {record: 8, status: 'Quarantined', temp: 37.8, symptom: 'Recovery'},
  {record: 9, status: 'At Home', temp: 37.8, symptom: 'Well'},
  {record: 10, status: 'At Work', temp: 37.8, symptom: 'Good'}
];

export interface HObservation {
  status: string;
  record: number;
  temp: number;
  symptom: string;
}

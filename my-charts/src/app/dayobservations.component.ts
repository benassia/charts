import { Component, Inject, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService, Observer, Observation } from './data.service';


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

    observer: Observer;

    displayedColumns = ['record', 'status', 'temp', 'symptom'];

    animal: string;
    name: string;

    constructor(public dialog: MatDialog, private data: DataService) {}

    ngOnInit(): void {
      this.data.currentObservation.subscribe(observer => this.observer = observer);
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
        console.log(result);
      });
    }
    openC19Q():void{
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog1, {
        width: '250px',
        data: {record: 12, status: 'Quarantined', temp: 39, symptom: 'Cough & Breath'}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      });
    }
    openC19A():void{
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog2, {
        width: '250px',
        data: {record: 13, status: 'Hospitalised', temp: 90, symptom: 'Severe'}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      });
    }
    openC19S(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog3, {
        width: '250px',
        data: {record: 14, status: 'Recovering', temp: 37.8, symptom: 'Exhuasted'}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
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
    @Inject(MAT_DIALOG_DATA) public data: Observation) {}

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
    @Inject(MAT_DIALOG_DATA) public data: Observation) {}

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
    @Inject(MAT_DIALOG_DATA) public data: Observation) {}

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
    @Inject(MAT_DIALOG_DATA) public data: Observation) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

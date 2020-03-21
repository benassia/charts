import { Component, Inject, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService, Observer, Observation } from './data.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { MatSort } from '@angular/material/sort';


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

    static ypos: string;

    showBuffer = false;
    color: ThemePalette = 'primary';
    mode: ProgressBarMode = 'buffer';
    value = 60;
    bufferValue = 95;

    observer: Observer;

    displayedColumns = ['record', 'status', 'temp', 'symptom', 'latlng'];

    dataSource = null;

    constructor(public dialog: MatDialog, private data: DataService) {}
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    ngOnInit(): void {
      this.data.currentObservation.subscribe(observer => this.observer = observer);
      this.dataSource = new MatTableDataSource(this.observer.observations);
      this.dataSource.sort = this.sort;
    }

    ngOnDestroy(): void {

    }



    openGood(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '250px',
        data: {record: 11, status: 'At Work', temp: 37.8, symptom: 'None'}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getMyLocation(result);
      });
    }
    openC19Q(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog1, {
        width: '250px',
        data: {record: 12, status: 'Quarantined', temp: 39, symptom: 'Cough & Breath'}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getMyLocation(result);
      });
    }
    openC19A(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog2, {
        width: '250px',
        data: {record: 13, status: 'Hospitalised', temp: 90, symptom: 'Severe'}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getMyLocation(result);
      });
    }
    openC19S(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog3, {
        width: '250px',
        data: {record: 14, status: 'Recovering', temp: 37.8, symptom: 'Exhuasted'}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getMyLocation(result);
      });
    }

    async delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }

  processPosition(position: any) {
      const pos =  position.coords.latitude + ',' + position.coords.longitude;
      DayObservationsComponent.ypos = pos;
  }

  async getMyLocation(result: Observation): Promise<void> {
      this.showBuffer = true;
      navigator.geolocation.getCurrentPosition(
          this.processPosition
      );
      await this.delay(5000);
      result.latlng = DayObservationsComponent.ypos;
      this.observer.observations.push(result);
      this.table.renderRows();
      this.data.updateObservation(this.observer);
      this.dataSource = new MatTableDataSource(this.observer.observations);
      this.dataSource.sort = this.sort;
      this.showBuffer = false;
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

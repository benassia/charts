import { Component, Inject, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService, Observer, Observation, KVLABELS, Identity } from './data.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    static yposTime: number;
    static recSize: number;
    static oCancel: boolean = false;

    showBuffer = false;
    color: ThemePalette = 'primary';
    mode: ProgressBarMode = 'buffer';
    value = 60;
    bufferValue = 95;

    identity: Identity;

    observer: Observer;
    pointObservation: Observation = {id:'_OBS', etype:KVLABELS.OBSERVER, crc:'crc', uid:'12',record: '12', activity: 'At Work', org: '12', status: 'Fine', temp: '2', symptom: 'None', notes: 'notes', latlng: '12', bstate: '1', datetime: '0',checked:false, created:'12', updated:'12'};

    displayedColumns = ['record', 'activity', 'status', 'temp', 'symptom', 'notes', 'latlng', 'datetime'];

    dataSource = null;

    constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private data: DataService) {}
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    ngOnInit(): void {
      this.data.currentIdentity.subscribe(indentity => this.identity = indentity);
      this.data.currentObservation.subscribe(observer => this.observer = observer);
      this.data.recoverObservations(this.identity);

      this.pointObservation = this.observer.observation;
      ////////console.log ('Your Stored Observer Is ' + JSON.stringify(this.observer));
      DayObservationsComponent.recSize = this.observer.observations.length + 1;
      this.dataSource = new MatTableDataSource(this.observer.observations);
      this.sort.direction ='desc';
      this.sort.active ='record';
      this.dataSource.sort = this.sort;

    }

    ngOnDestroy(): void {

    }



    openGood(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '250px',
        data: {id:'12', etype: KVLABELS.OBSERVER, crc:'crc', uid:'',record: ''+ DayObservationsComponent.recSize++, activity: 'At Work', status: 'Fine', temp: '2', symptom: 'None', notes: 'notes', latlng: '12', bstate: '1', datetime: '0',checked:false, created:'12', updated:'12'}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result!=undefined)
          this.getMyLocation(result);
      });
    }
    openC19Q(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog1, {
        width: '250px',
        data: {id:'12', etype: KVLABELS.OBSERVER, crc:'crc', uid:'',record: ''+ DayObservationsComponent.recSize++, activity: 'At Work', status: 'Fine', temp: '2', symptom: 'None', notes: 'notes', latlng: '12', bstate: '1', datetime: '0',checked:false, created:'12', updated:'12'}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result!=undefined)
          this.getMyLocation(result);
      });
    }
    openC19A(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog2, {
        width: '250px',
        data: {id:'12', etype: KVLABELS.OBSERVER, crc:'crc', uid:'12',record: ''+ DayObservationsComponent.recSize++, activity: 'At Work', status: 'Fine', temp: '2', symptom: 'None', notes: 'notes', latlng: '12', bstate: '1', datetime: '0',checked:false, created:'12', updated:'12'}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result!=undefined)
          this.getMyLocation(result);
      });
    }
    openC19S(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog3, {
        width: '250px',
        data: {id:'12', etype: KVLABELS.OBSERVER, crc:'crc', uid:'12',record: ''+ DayObservationsComponent.recSize++, activity: 'At Work', status: 'Fine', temp: '2', symptom: 'None', notes: 'notes', latlng: '12', bstate: '1', datetime: '0',checked:false, created:'12', updated:'12'}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result!=undefined)
          this.getMyLocation(result);
      });
    }

    async delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }

  processPosition(position: any) {
      const pos =  position.coords.latitude + ',' + position.coords.longitude;
      const posTime = position.timestamp;
      DayObservationsComponent.ypos = pos;
      DayObservationsComponent.yposTime = posTime;
  }

  async getMyLocation(result: Observation): Promise<void> {
    if (!DayObservationsComponent.oCancel) {
      //////console.log(JSON.stringify(result));
      this.showBuffer = true;
      navigator.geolocation.getCurrentPosition(
          this.processPosition
      );
      await this.delay(5000);
      result.latlng = DayObservationsComponent.ypos;
      result.datetime = ''+ DayObservationsComponent.yposTime;
      this.pointObservation = result;
      this.observer.observations.push(this.pointObservation);
      this.observer.observation = this.pointObservation;
      this.table.renderRows();
      this.data.refreshObservation(this.observer);
      this.dataSource = new MatTableDataSource(this.observer.observations);
      this.sort.direction ='desc';
      this.sort.active ='record';
      this.dataSource.sort = this.sort;
      this.openSnackBar("Observation","Has Been Recorded")
      this.showBuffer = false;
    } else {
      DayObservationsComponent.oCancel = false;
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}

@Component({
  selector: 'goodhealthrecord',
  templateUrl: 'goodhealthrecord.html',
})
export class DialogOverviewExampleDialog {
  temp = '37.2';
  status='1';
  symptom='1';
  activity='1';
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Observation) {}

  onNoClick(): void {
    DayObservationsComponent.oCancel = true;
    DayObservationsComponent.recSize--;
    this.dialogRef.close();
    
  }

}

@Component({
  selector: 'c19qhealthrecord',
  templateUrl: 'c19qhealthrecord.html',
})
export class DialogOverviewExampleDialog1 {
  temp = '37.2';
  status='2';
  symptom='1';
  activity='2';
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog1>,
    @Inject(MAT_DIALOG_DATA) public data: Observation) {}

  onNoClick(): void {
    DayObservationsComponent.oCancel = true;
    DayObservationsComponent.recSize--;
    this.dialogRef.close();
    
  }

}

@Component({
  selector: 'c19ahealthrecord',
  templateUrl: 'c19ahealthrecord.html',
})
export class DialogOverviewExampleDialog2 {
  temp = '37.6';
  status='6';
  symptom='6';
  activity='6';
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog2>,
    @Inject(MAT_DIALOG_DATA) public data: Observation) {}

  onNoClick(): void {
    DayObservationsComponent.oCancel = true;
    DayObservationsComponent.recSize--;
    this.dialogRef.close();
  }

}

@Component({
  selector: 'c19shealthrecord',
  templateUrl: 'c19shealthrecord.html',
})
export class DialogOverviewExampleDialog3 {
  temp = '37.4';
  status='4';
  symptom='4';
  activity='4';
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog3>,
    @Inject(MAT_DIALOG_DATA) public data: Observation) {}

  onNoClick(): void {
    DayObservationsComponent.oCancel = true;
    DayObservationsComponent.recSize--;
    this.dialogRef.close();
  }

}

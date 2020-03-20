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
        data: {record: 11, status: 'Hydrogen', temp: 1.0079, symptom: 'H'}
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
        data: {record: 12, status: 'Hydrogen', temp: 1.0079, symptom: 'H'}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.dataSource.push(result);
      });
    }
    openC19A():void{
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog2, {
        width: '250px',
        data: {record: 13, status: 'Hydrogen', temp: 1.0079, symptom: 'H'}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.dataSource.push(result);
      });
    }
    openC19S():void{
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog3, {
        width: '250px',
        data: {record: 14, status: 'Hydrogen', temp: 1.0079, symptom: 'H'}
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
  {record: 1, status: 'Hydrogen', temp: 1.0079, symptom: 'H'},
  {record: 2, status: 'Helium', temp: 4.0026, symptom: 'He'},
  {record: 3, status: 'Lithium', temp: 6.941, symptom: 'Li'},
  {record: 4, status: 'Beryllium', temp: 9.0122, symptom: 'Be'},
  {record: 5, status: 'Boron', temp: 10.811, symptom: 'B'},
  {record: 6, status: 'Carbon', temp: 12.0107, symptom: 'C'},
  {record: 7, status: 'Nitrogen', temp: 14.0067, symptom: 'N'},
  {record: 8, status: 'Oxygen', temp: 15.9994, symptom: 'O'},
  {record: 9, status: 'Fluorine', temp: 18.9984, symptom: 'F'},
  {record: 10, status: 'Neon', temp: 20.1797, symptom: 'Ne'},
];

export interface HObservation {
  status: string;
  record: number;
  temp: number;
  symptom: string;
}

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SecureAppComponent } from './secure.component';
import { UnSecureAppComponent } from './unsecure.component';

import { HomeComponent } from './home.component';
import { ChatComponent } from './chat.component';
import { ChartsComponent } from './charts.component';

import { YourDetailsComponent } from './yourdetails.component';
import { LocationTrackerComponent } from './locationtracker.component';
import { DayObservationsComponent, DialogOverviewExampleDialog, DialogOverviewExampleDialog1, DialogOverviewExampleDialog2, DialogOverviewExampleDialog3 } from './dayobservations.component';
import { YourSummaryComponent } from './yoursummary.component';
import { AegonSummaryComponent } from './aegonsummary.component';
import { WorldComparatorComponent } from './worldcomparator.component';
import { AegonRadarChartComponent } from './aegonradarchart.component';
import { WorldRadarChartComponent } from './worldradarchart.component';
import { YourChartComponent } from './yourchart.component';

import { BarChartComponent } from './barchart.component';
import { BubbleChartComponent } from './bubblechart.component';
import { DoughnutChartComponent } from './doughnutchart.component';

import { PieChartComponent } from './piechart.component';
import { PolarAreaChartComponent } from './polarareachart.component';
import { RadarChartComponent } from './radarchart.component';
import { ScatterChartComponent } from './scatterchart.component';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

console.log('[app.module] debug');

const conditionalImports = [];
if (!/iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())) {	// if not iphone family

}
const routes: Routes = [
	{ 
	 path: '', pathMatch: 'full', redirectTo: '/'
	}
   ];



@NgModule({
  declarations: [
    AppComponent,
    SecureAppComponent,
    UnSecureAppComponent,
    HomeComponent,
    ChatComponent,
    ChartsComponent,
    YourDetailsComponent,
    LocationTrackerComponent,
    DayObservationsComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog1,
    DialogOverviewExampleDialog2,
    DialogOverviewExampleDialog3,
    YourSummaryComponent,
    AegonSummaryComponent,
    WorldComparatorComponent,
    BarChartComponent,
    BubbleChartComponent,
    DoughnutChartComponent,
    YourChartComponent,
    PieChartComponent,
    PolarAreaChartComponent,
    RadarChartComponent,
    AegonRadarChartComponent,
    WorldRadarChartComponent,
    ScatterChartComponent
  ],
  imports: [
    DeviceDetectorModule.forRoot(),
    NgxAutoScrollModule,
    StorageServiceModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    BrowserAnimationsModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    AuthGuard,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

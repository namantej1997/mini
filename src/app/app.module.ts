import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { StockDataService } from './stock-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import { MatDialogModule, MatTooltipModule, MatIconModule } from '@angular/material';
import { StockChildComponent } from './stockdata/stock-child/stock-child.component';
import { HistoryGraphComponent } from './graph-child/history-graph/history-graph.component';
import { DataPoints } from './stockdata/stock-child/data/DataPoints';
import { AgGridComponent } from './stockdata/ag-grid/ag-grid.component';
import { ViewButtonComponent } from './view-button/view-button.component';
import { MatCardModule } from '@angular/material/card';
import { AgGridModule } from 'ag-grid-angular';
import { DataDialougueComponent } from './stockdata/data-dialougue/data-dialougue.component';
import { DeleteDataComponent } from './stockdata/delete-data/delete-data.component';

@NgModule({
  entryComponents: [DataDialougueComponent],
  declarations: [
    AppComponent,
    StockChildComponent,
    HistoryGraphComponent,
    AgGridComponent,
    ViewButtonComponent,
    DataDialougueComponent,
    DeleteDataComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    AgGridModule.withComponents([ViewButtonComponent, DeleteDataComponent]),
    ReactiveFormsModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [StockDataService, DataPoints],
  bootstrap: [AppComponent]
})
export class AppModule {}
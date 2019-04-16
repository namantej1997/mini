import { Component } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import { StockDataResponse } from '../stockDataStore/StockDataResponse';
import { StockDataService } from '../stock-data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DataDialougueComponent } from '../stockdata/data-dialougue/data-dialougue.component';
export interface DialogData {
  stockData: StockDataResponse;
  graphData: any[];
}

@Component({
  selector: 'app-view-button',
  templateUrl: './view-button.component.html',
  styleUrls: ['./view-button.component.css']
})
export class ViewButtonComponent implements ICellRendererAngularComp {
  errorMessage:string;
  graphData:any[];
  error=false;
  stockDataResponse:StockDataResponse=new StockDataResponse();

  constructor( private stockDataService:StockDataService, private dialogue:MatDialog) { 
    console.log("came to popup")
  }

  public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public invokeParentMethod() {
      console.log("came to popup")
      this.getData();
      
    }
    openDialogueBox()
    {
      console.log("came to dialog")
      const dialogRef = this.dialogue.open(DataDialougueComponent,{
        width: '800px',
        height:'500px',
        data: {stockData: this.stockDataResponse, graphData: this.graphData}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
       // this.animal = result;
      });

    }
    getStockData()
    {
      this.stockDataService.getStockData(this.params.data.symbol).subscribe(data=>
        {
          if(data == undefined)
          {
            
            this.errorMessage="Data Not Found";
            this.error=true;
            return;
          }
          else
          {
          this.stockDataResponse.companySymbol=data.symbol;
          this.stockDataResponse.companyName=data.companyName;
          this.stockDataResponse.LatestPrice=data.latestPrice;
          this.stockDataResponse.change=data.change;
          this.stockDataResponse.changePercentage=data.changePercent;
          this.stockDataResponse.latestTime=data.latestTime;
          this.openDialogueBox();
          }
  
          console.log(data)
  
        });

    }
    getData()
    {
      
        this.stockDataService.getGraphData(this.params.data.symbol).subscribe(data=>
          {
            this.graphData=data;
            this.getStockData();
            console.log("Graph Data")
            console.log(data)
          });

    }

    refresh(): boolean {
        return false;
    }

}

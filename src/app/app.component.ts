import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StockDataService } from './stock-data.service';
import { StockDataResponse } from './stockDataStore/StockDataResponse';
// import SockJS from 'sockjs-client';
// import * as Stomp from 'stompjs';
declare var require: any;
declare var fs: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stockForm: FormGroup;
  symbol: string;
  isLoading = false;
  disableView = false;
  showFavourite = false;
  error = false;
  disableSearch = true;
  showGraph = false;
  dataLoad = false;
  private stompClient = null;
  errorMessage: string;
  graphData: any[];
  stockDataResponse: StockDataResponse = new StockDataResponse();
  constructor(private stockDataService: StockDataService) {
    this.stockForm = new FormGroup({
      symbol: new FormControl('', Validators.required)
    });
  }
  onSubmit() {
    this.disableView = false;
    this.dataLoad = false;
    this.isLoading = true;
    this.showFavourite = false;
    console.log('form Submitted');
    this.symbol = this.stockForm.get('symbol').value;

    //   this.stockDataService.getQuotes(this.symbol).subscribe(
    //   data => {
    //     console.log("websocket"+data);
    //       if (data === undefined) {
    //         this.errorMessage = 'Data Not Found';
    //         this.error = true;
    //         this.isLoading = false;
    //         this.dataLoad = false;
    //         return;
    //       } else {
    //         this.stockDataResponse.companySymbol = data.symbol;
    //         this.stockDataResponse.companyName = data.companyName;
    //         this.stockDataResponse.LatestPrice = data.latestPrice;
    //         this.stockDataResponse.change = data.change;
    //         this.stockDataResponse.changePercentage = data.changePercent;
    //         this.stockDataResponse.latestTime = data.latestTime;
    //         this.isLoading = false;
    //       }
    //     }
    // );

    this.stockDataService.getStockData(this.symbol).subscribe(data=>
      {
        console.log("hello"+data)
        if(data == undefined)
        {
          
          this.errorMessage="Data Not Found";
          this.error=true;
          this.isLoading=false;
          this.dataLoad=false;
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
        this.isLoading=false;
        
        }

       // console.log(data)

      });
      this.stockDataService.getGraphData(this.symbol).subscribe(data=>
        {
          this.graphData=data;
          this.dataLoad=true;
          console.log("Graph Data")
          console.log(data)
        })
      console.log("hi"+this.stockDataResponse.companyName)
  }


  // connect() {
  //   const socket = new SockJS('http://localhost:8080/gkz-stomp-endpoint');
  //   this.stompClient = Stomp.over(socket);
  // }
  viewFavourite(event) {
    this.isLoading = true;
    this.dataLoad = false;
    this.showFavourite = true;
  }
  addToFavourites() {
    const mysql = require('mysql');

    const con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'stockdata'
    });

    con.connect(function(err) {
      if (err) { throw err; }
      console.log('Connected!');
      const sql = `INSERT INTO stockdata (symbol,companyName) values(` +
        this.stockDataResponse.symbol +
        `,` +
        this.stockDataResponse.companyName`);`;
      // tslint:disable-next-line:no-shadowed-variable
      con.query(sql, function(err: any, result: any) {
        if (err) {
          throw err;

        }
        console.log('Values Inserted');
      });
    });
  }
  OnSuccess(message: string) {
    this.isLoading = false;
  }
  OnNotify(message: string) {
    this.disableView = true;
  }
  OnError(message: string) {
    this.isLoading = false;
    this.errorMessage = message;
    this.error = true;
  }
  validdateForm() {
    if (this.stockForm.status === 'INVALID') {
      this.disableSearch = true;
      return;
    }
    this.disableSearch = false;

  }
}
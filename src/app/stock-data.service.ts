import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { Socket } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StockDataService {
  socket: Socket;
  observer: Observer<number>;
  constructor(private httpClient : HttpClient) { }
  getStockData(symbol: string): Observable <any>
  {
    console.log("came to service gestockdata")
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/quote`;
    return this.httpClient.get(url);
  }
  getGraphData(symbol: string): Observable <any>
  {
    console.log("came to service getGraphData")
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/chart/1m`;
    return this.httpClient.get(url);
  }
 

  getQuotes(symbol: string): Observable<any> {
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/quote`;
    this.socket = socketIo(url);

    this.socket.on('data', (res) => {
      this.observer.next(res.data);
    });

    return this.createObservable();
  }

  createObservable(): Observable<number> {
      return new Observable<number>(observer => {
        this.observer = observer;
      });
  }

}
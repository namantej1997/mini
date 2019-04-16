import { Time } from '@angular/common';

export class StockDataResponse
{
    companySymbol:string;
    companyName:string;
    LatestPrice:number;
    change:number;
    changePercentage:string;
    latestTime:Time;
    constructor()
    {
        
    }

}
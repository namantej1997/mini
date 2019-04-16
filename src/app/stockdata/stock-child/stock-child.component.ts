import { Component, OnInit, Input } from '@angular/core';
import { StockDataResponse } from 'src/app/stockDataStore/StockDataResponse';
import * as CanvasJS from './canvasjs.min';
import {DataPoints} from './data/DataPoints';

@Component({
  selector: 'app-stock-child',
  templateUrl: './stock-child.component.html',
  styleUrls: ['./stock-child.component.css']
})
export class StockChildComponent implements OnInit {
  @Input() stockDataResponse;
  @Input() graphData:any[];

  dataPoint:any[]=[];
  lowDataPoints:any[]=[];
  highDataPoints:any[]=[];
  companyName:string="MSFt";

  constructor(private dataPoints: DataPoints) { }

  title = 'canvasjs-angular';
  ngOnInit() {
    this.dataPoints=new DataPoints();
      this.graphData.forEach(data=>
        {
          
          this.lowDataPoints.push({x:new Date(data.date), y:data.low});
          this.highDataPoints.push({x:new Date(data.date), y:data.high});
           this.dataPoint.push({x:new Date(data.date), y:data.close});
            
        })
        console.log(this.dataPoints)
		
		let chart = new CanvasJS.Chart("chartContainer",{
      animationEnabled: true,
      theme: "light2",
			title:{
				text: "History Graph"
      },
      axisX: {
        title:"Date",
        crosshair: {
          enabled: true
        }
      },
      axisY: {
        title:"Price",
        includeZero: false
      },
      tooltip:{
        shared:true
      },
      legend:{
        cursor:"pointer",
        verticalAlign: "bottom",
        horizontalAlign: "left",
        dockInsidePlotArea: true,
      },
			data: [{
        type: "line",
        showInLegend: true,
        name: "Highest Price",
        dataPoints : this.highDataPoints,
        
      },
      {
        type: "line",
        showInLegend: true,
        name: "Closing Price",
        dataPoints : this.dataPoint,
        
      },
      {
        type: "line",
        showInLegend: true,
        name: "Lowest Price",
        dataPoints : this.lowDataPoints,
        
      }
    ],
      
    });
		chart.render();
    }

}
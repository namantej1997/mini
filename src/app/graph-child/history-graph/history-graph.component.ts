import { Component, OnInit, Input } from '@angular/core';
import * as CanvasJS from '../../stockdata/stock-child/canvasjs.min';
//import {DataPoints} from './data/DataPoints';
// import * as GcrossHair from './g-crosshair';

@Component({
  selector: 'app-history-graph',
  templateUrl: './history-graph.component.html',
  styleUrls: ['./history-graph.component.css']
})
export class HistoryGraphComponent {
  @Input() graphData:any[];

  dataPoint:any[]=[];
  lowDataPoints:any[]=[];
  highDataPoints:any[]=[];
  companyName:string="MSFt";

  constructor(/* private dataPoints: DataPoints */) { }

  title = 'canvasjs-angular';
 // ngOnInit() {
    /* this.dataPoints=new DataPoints();
      this.graphData.forEach(data=>
        {
          
          this.lowDataPoints.push({x:new Date(data.date), y:data.low});
          this.highDataPoints.push({x:new Date(data.date), y:data.high});
           this.dataPoint.push({x:new Date(data.date), y:data.close});
            
        })
        console.log(this.dataPoints)
		
		let chart = new CanvasJS.Chart("chartContainer",{
			animationEnabled: true,
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
			data: [{
        type: "line",
        name: "Highest Price",
        dataPoints : this.highDataPoints,
        
      },
      {
        type: "line",
        name: "Closing Price",
        dataPoints : this.dataPoint,
        
      },
      {
        type: "line",
        name: "Lowest Price",
        dataPoints : this.lowDataPoints,
        
      }
    ],
      
    });
		chart.render();
    } */

}

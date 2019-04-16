import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/view-button/view-button.component';
import { StockDataResponse } from 'src/app/stockDataStore/StockDataResponse';

@Component({
  selector: 'app-data-dialougue',
  templateUrl: './data-dialougue.component.html',
  styleUrls: ['./data-dialougue.component.css']
})
export class DataDialougueComponent implements OnInit {
  graphData:any[];
  stockData:StockDataResponse;

  constructor(
    public dialogRef: MatDialogRef<DataDialougueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.graphData=data.graphData;
      this.stockData=data.stockData;
      console.log(this.stockData)
    };

  onNoClick(): void {
    this.dialogRef.close();
  };
  ngOnInit() {
  }


  

}

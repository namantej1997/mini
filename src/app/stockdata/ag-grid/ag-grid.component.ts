import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ViewButtonComponent } from 'src/app/view-button/view-button.component';
import { DeleteDataComponent } from 'src/app/stockdata/delete-data/delete-data.component';
import { GridOptions } from 'ag-grid-community';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css']
})
export class AgGridComponent implements OnInit {
  columnDefs: any[];
  private gridOptions: GridOptions;
  private rowData: any[];
  private context;
  private stompClient = null;
  private frameworkComponents;
  @Output() success: EventEmitter<string> = new EventEmitter<string>();
  @Output() error: EventEmitter<string> = new EventEmitter<string>();
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.columnDefs = [
      {
        headerName: 'Symbol',
        field: 'symbol',
        width: 175
      },
      {
        headerName: 'Company Name',
        field: 'companyName',
        colId: "square",
        width: 250
      },

      {
        headerName: 'View',
        field: 'value',
        cellRenderer: 'childMessageRenderer',
        colId: "params",
        width: 175
      },
      {
        headerName: 'Delete',
        field: "delete",
        cellRenderer: "deleteData",
        colId: "params",
        width: 175
      }
    ];
    this.rowData = [
      { symbol: "MSFT", companyName: "Microsoft-Corporation", value: "click", delete : 'click'}
    ];

    this.context = { componentParent: this };
    this.frameworkComponents = {
      childMessageRenderer: ViewButtonComponent,
      deleteData: DeleteDataComponent
    };
    this.gridOptions = <GridOptions>{
      enableStatusBar: true,
      enableSorting: true,
      suppressNoRowsOverlay: false,
      enableColResize: true,
      enableCellChangeFlash: true,
      enableFilter: true,
      enableRangeSelection: true,
      rowSelection: 'multiple',
      rowDeselection: true,
      suppressRowClickSelection: true,
      stopEditingWhenGridLosesFocus: false,
      onRowSelected: this.rowClickEventHandler.bind(this)
    };
  }

  ngOnInit() {
    //this.connect();
    this.notify.emit("Disable Button");
  }
  connect() {
    const socket = new SockJS("http://localhost:8080/gkz-stomp-endpoint");
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, function(frame) {
      this.stompClient.subscribe("/topic/hi", function(hello) {
        // _this.showGreeting(JSON.parse(hello.body).greeting);
        this.rowData = JSON.parse(hello.body);
      });
    });
  }
  onGridReady(event) {
    this.setTableData();
  }
  rowClickEventHandler(event) {}
  setTableData() {
    this.success.emit("successful");

    this.gridOptions.api.sizeColumnsToFit();
    this.gridOptions.api.setRowData(this.rowData);

    if (this.rowData.length < 10) {
      this.gridOptions.api.setGridAutoHeight(true);
    } else {
      this.gridOptions.api.setGridAutoHeight(false);
    }
  }
}
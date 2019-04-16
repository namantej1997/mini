import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
declare var require: any;
@Component({
  selector: 'app-delete-data',
  templateUrl: './delete-data.component.html',
  styleUrls: ['./delete-data.component.css']
})
export class DeleteDataComponent implements ICellRendererAngularComp {

  constructor() { }


  public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public invokeParentMethod() {
      console.log("came to delete");
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
        const sql = `DELETE FROM stockdata where symbol=` +
          this.params.symbol;
        con.query(sql, function(err: any, result: any) {
          if (err) {
            throw err; }
          console.log('Values Deleted');
        });
      });
    }

    refresh(): boolean {
      return false;
  }


}
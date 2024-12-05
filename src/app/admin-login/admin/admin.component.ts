import { Component, ViewChild,OnInit } from '@angular/core';
import { DataStoreServiceService } from '../../Services/data-store-service.service';
import { DataTableDirective, } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { Config } from 'datatables.net';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;
  dtOptions: Config = {}; 


  plans:any
  
  constructor(private dataStore:DataStoreServiceService, private http:HttpClient){
  //  this.dataStore.getAllSubscriber({"page":1, "limit":3}).subscribe((res:any)=>{
  //   this.plans=res.data
  //  })
  }
 
 
  ngOnInit(): void {
    this.dtOptions = {
      serverSide: true,
      processing: true, 
      pagingType: 'full_numbers', // Include pagination controls
      pageLength: 5,             // Default number of rows per page
      ajax: (dataTablesParameters: any, callback) => {
        console.log(dataTablesParameters);
        this.http
          .post('http://localhost:8000/all-subscriptions', dataTablesParameters)
          .subscribe((resp: any) => {
            callback({
              draw: resp.draw,
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
            });
          });
      },
      columns: [
        { title: 'Subscription ID', data: 'subscription_id' },
        { title: 'Transaction ID', data: 'transaction_id' },
        { title: 'User Name', data: 'user_name' },
        { title: 'Plan Name', data: 'plan_name' },
        { title: 'Expiry Date', data: 'expiry', render: function (data: any) {
          // Format the date (e.g., 'YYYY-MM-DD')
          const date = new Date(data);
          return date.toLocaleDateString('en-GB'); // Formats as 'DD/MM/YYYY' for example
        }},
        { title: 'Created At', 
          data: 'created_at', 
          render: function (data: any) {
          // Format the date (e.g., 'YYYY-MM-DD')
          const date = new Date(data);
          return date.toLocaleDateString('en-GB'); // Formats as 'DD/MM/YYYY' for example
        } },
      ]
    };
  }


}

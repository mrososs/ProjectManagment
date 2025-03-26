import { Component  , input, Input , OnInit} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-custom-table',
  standalone: false,
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss'
})
export class CustomTableComponent  {


  @Input() headers: string[] = [];  // Column headers ..Column names
  @Input() data: any[] = [];        // Data rows .. Input property to accept dynamic table data

  @Input() length :number =100;
  @Input() pageSize :number =10 ;
  @Input() pageIndex !:number ;
  @Input() searchTerm !:string




  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }


}
// -----------------------------------------------------------------
//EX .. in parent component should used 2 arr
// 1-for thead loop   --- Define column names
// 2-for tr loop ---- Data for the table
//
//  headers = ['Name', 'Age', 'Email'];
//  data = [
//   { Name: 'John Doe', Age: 28, Email: 'john@example.com' },
//   { Name: 'Jane Smith', Age: 34, Email: 'jane@example.com' },
//   { Name: 'Sam Wilson', Age: 22, Email: 'sam@example.com' }
// ];
// ---------
//  to call
//   <app-reusable-table  [data]="data"  [headers]="headers"></app-reusable-table>


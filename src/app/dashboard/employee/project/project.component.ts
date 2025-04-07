import { Component } from '@angular/core';
import { ProjectService } from './services/project.service';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  allProjects !:any[]

  pageSize = 10;
  pageNumber = 1;
  length = 0;

  searchForm!: FormGroup;

  constructor(private _ProjectService:ProjectService){
    this.onGettingAllEmployeeProjects()
  }
  onGettingAllEmployeeProjects():void{
    // const title = this.searchForm.get('search')?.value || '';
    const params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      // title :title,
    }
    this._ProjectService.onGettingAllEmployeeProjects(params).subscribe({
      next :(res)=>{
        console.log(res);
        this.allProjects=res.data
        this.pageSize=res.totalNumberOfPages
        this.pageNumber = res.  totalNumberOfRecords
      } ,
      error :(err)=>{
        console.log(err);

      } ,
    })

  }



    handlePageEvent(event: PageEvent): void {
      this.pageSize = event.pageSize;
      this.pageNumber = event.pageIndex + 1; // Angular paginator is 0-based

    }

}

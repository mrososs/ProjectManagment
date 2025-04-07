import { Component } from '@angular/core';
import { ProjectService } from './services/project.service';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { IProject, IProjectData } from '../interFaces/projects';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  allProjectData !:IProject
  allProjects !:IProjectData[]
  pageSize :number= 10;
  pageNumber :number = 1;
  length :number = 0;
  searchForm: FormGroup= new FormGroup({
        search: new FormControl(''),
      });

  constructor(private _ProjectService:ProjectService){
    this.onGettingAllEmployeeProjects()

  }
  onGettingAllEmployeeProjects():void{


    const title = this.searchForm.get('search')?.value || '';
    const params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
       title :title,
    }
    this._ProjectService.onGettingAllEmployeeProjects(params).subscribe({
      next :(res)=>{
        console.log(res);
        this.allProjectData=res
        this.allProjects=res.data
        this.pageSize=res.totalNumberOfPages
        this.length = res.totalNumberOfRecords
      } ,
      error :(err)=>{
        console.log(err);
      } ,
    })

  }



    handlePageEvent(event: PageEvent): void {
      console.log(event);
      this.length = event.length
      this.pageSize=event.pageSize
      this.pageNumber = event.pageIndex
      this.onGettingAllEmployeeProjects()
    }

}

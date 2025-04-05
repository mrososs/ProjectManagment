import { Component } from '@angular/core';
import { ProjectService } from './services/project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  allProjects !:any[]
  constructor(private _ProjectService:ProjectService){
    this.onGettingAllEmployeeProjects()
  }
  onGettingAllEmployeeProjects():void{
    const params = { pageNumber:1 , pageSize:10 }
    this._ProjectService.onGettingAllEmployeeProjects(params).subscribe({
      next :(res)=>{
        console.log(res);
        this.allProjects=res.data

      } ,
      error :(err)=>{
        console.log(err);

      } ,
    })

  }



}

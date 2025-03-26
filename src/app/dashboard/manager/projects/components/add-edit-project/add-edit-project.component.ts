import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-project',
  standalone: false,
  templateUrl: './add-edit-project.component.html',
  styleUrl: './add-edit-project.component.scss'
})
export class AddEditProjectComponent {
  projectId:number = 0;
  addEditForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('',[Validators.required] )
    });
    constructor(
      private _ProjectService:ProjectService,
      private _ActivatedRoute:ActivatedRoute
    ){
      this.projectId = _ActivatedRoute.snapshot.params['id'];
      if (this.projectId) {
        this.onGitProject(this.projectId)
      }
      console.log(_ActivatedRoute.snapshot.params['id']);
    }
    



  onGitProject(id:number):void{
    this._ProjectService.onGitProjectId(id).subscribe({
      next: (res) =>{
        console.log(res);
        
      }
    })
  }  

  sendData(data: FormGroup){

    this._ProjectService.onAddProject(data.value).subscribe({
      next: (res) =>{
        console.log(res);
      },
    });
  }
}

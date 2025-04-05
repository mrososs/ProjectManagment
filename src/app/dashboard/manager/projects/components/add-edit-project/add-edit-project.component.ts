import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-project',
  standalone: false,
  templateUrl: './add-edit-project.component.html',
  styleUrl: './add-edit-project.component.scss',
})
export class AddEditProjectComponent {
  projectId: number = 0;
  isView! : boolean;
  addEditForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  constructor(
    private _ProjectService: ProjectService,
    private _ActivatedRoute: ActivatedRoute,
    private _toaster: ToastrService,
    private _route: Router
  ) {
    this.projectId = _ActivatedRoute.snapshot.params['id'];
    if (this.projectId) {
      this.onGitProject(this.projectId);
    }
     // Check if the URL includes 'view'
  const urlSegments = _ActivatedRoute.snapshot.url.map(segment => segment.path);
  this.isView = urlSegments.includes('view');
    // Disable form if it's in view mode
    if (this.isView) {
      this.addEditForm.disable();
    }
  }

  onGitProject(id: number): void {
    this._ProjectService.onGitProjectId(id).subscribe({
      next: (res) => {
        this.addEditForm.patchValue({
          title: res.title,
          description: res.description,
        });
      },
    });
  }

  sendData(data: FormGroup) {
    this._ProjectService.onAddProject(data.value).subscribe({
      next: (res) => {
        this._route.navigate(['/dashboard/manager/projects']);
      },
      complete:()=>{
        this._toaster.success("Edit Project Success")
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { IProject } from '../../../../../core/interfaces/project-task';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss'],
})
export class AddEditTaskComponent implements OnInit {
  addEditForm!: FormGroup;
  projects: IProject[] = [];
  users: any;
  taskId: number = 0;
  isView: boolean = false; // Flag to check if it's a view mode
  isEdit: boolean = false; // Flag to check if it's an edit mode

  constructor(
    private tasksService: TasksService,
    private _ActivatedRoute: ActivatedRoute,
    private _toaster: ToastrService,
    private _route: Router
  ) {
    this.taskId = _ActivatedRoute.snapshot.params['id'];
    // Check if the URL contains 'view' or 'edit'
    const mode = _ActivatedRoute.snapshot.url[0].path;
    this.isView = mode === 'view'; // If the URL is "view", set the form as view mode
    this.isEdit = mode === 'edit'; // If the URL is "edit", set the form as edit mode

    this.addEditForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      projectId: new FormControl('', [Validators.required]),
      userId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getProjects();
    this.getUsers();

    // If editing, load the task data
    if (this.taskId && this.isEdit) {
      this.onGetTask(this.taskId);
    }

    // If it's in view mode, disable the form fields
    if (this.isView) {
      this.onGetTask(this.taskId);
      this.addEditForm.disable(); // Disable all form fields
    }
  }

  onGetTask(id: number): void {
    this.tasksService.getTaskById(id).subscribe({
      next: (res) => {
        this.addEditForm.patchValue({
          title: res.title,
          description: res.description,
          projectId: res.project.id,
          userId: res.employee.id, // Ensure you patch the employee's id correctly
        });

        // If you want to display the employee's username in the dropdown
        const user = this.users.find((u: any) => u.id === res.employee.id);
        if (user) {
          this.addEditForm.get('userId')?.setValue(user.id);
        }
      },
    });
  }

  getProjects(): void {
    this.tasksService.getProjectsForManager({
      pageSize: 10,
      pageNumber: 1,
    });

    // Subscribe to the projects$ observable to get the list of projects
    this.tasksService.projects$.subscribe((projects) => {
      this.projects = projects;
    });
  }

  getUsers(): void {
    this.tasksService.getUsersForManager({
      pageSize: 10,
      pageNumber: 1,
    });

    // Subscribe to the users$ observable to get the list of users
    this.tasksService.users$.subscribe((users) => {
      this.users = users;
    });
  }

  onSubmit(): void {
    if (this.addEditForm.valid && this.isEdit) {
      const taskData = this.addEditForm.value;
      // Call the service to update the task with taskData
      this.tasksService.onAddTask(taskData).subscribe({
        next: () => this._route.navigate(['/dashboard/manager/projects']),
        complete: () => {
          this._toaster.success('Edit Project Success');
        },
      });
    }
  }
}

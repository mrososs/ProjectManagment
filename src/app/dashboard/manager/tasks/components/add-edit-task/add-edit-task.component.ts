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
      employeeId: new FormControl('', [Validators.required]),
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
        // Patch task data into the form, including the employeeId
        this.addEditForm.patchValue({
          title: res.title,
          description: res.description,
          projectId: res.project.id,
          employeeId: res.employee.id, // Correctly patch employeeId into the form
        });

        // After patching, set the employeeId if needed (i.e., set it from the list of users)
        const selectedUser = this.users.find(
          (u: any) => u.id === res.employee.id
        );
        if (selectedUser) {
          // Make sure employeeId is correctly set if user is found
          this.addEditForm.get('employeeId')?.setValue(selectedUser.id);
        } else {
          // If user is not found in the users list, you can handle it here (optional)
          this._toaster.error('Employee not found.');
        }
      },
      error: (err) => {
        console.error('Error fetching task data', err);
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
    const taskData = this.addEditForm.value;

    // Ensure employeeId is correctly set
    if (!taskData.employeeId) {
      // If employeeId is not set, attempt to get it from the users list (or show an error)
      const selectedUser = this.users.find(
        (user: any) => user.id === taskData.employeeId
      );
      if (selectedUser) {
        taskData.employeeId = selectedUser.id; // Ensure correct user ID is being set
      } else {
        // Handle case where employeeId is not valid (you can show a toaster message here)
        this._toaster.error('Please select a valid employee.');
        return; // Prevent submission if no valid employee is selected
      }
    }

    console.log(taskData); // Check if employeeId is correct

    // Call the service to add the task with taskData
    this.tasksService.onAddTask(taskData).subscribe({
      next: () => this._toaster.success('Task saved successfully!'),
      complete: () => {
        this._route.navigate(['/dashboard/manager/tasks']);
      },
    });
  }
}

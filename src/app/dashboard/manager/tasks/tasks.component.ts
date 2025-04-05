import { Component, OnInit } from '@angular/core';
import { TasksService } from './services/tasks.service';
import { Task } from '../../../core/interfaces/taskModel';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone:false
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  searchForm!: FormGroup;

  constructor(private _taskService: TasksService) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.fetchTasks();

    // Update tasks list when BehaviorSubject changes
    this._taskService.tasks$.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });

    // Handle search
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(
        debounceTime(300) // to avoid too many API calls
      )
      .subscribe((value: string) => {
        this.fetchTasks(value);
      });
  }
  filterByStatus(status: string) {
    const title = this.searchForm.get('search')?.value || '';
    this._taskService
      .getTasks({
        pageSize: 10,
        pageNumber: 0,
        title,
        status,
      })
      .subscribe();
  }

  fetchTasks(title: string = '') {
    this._taskService
      .getTasks({
        pageSize: 10,
        pageNumber: 0,
        title,
      })
      .subscribe();
  }
}

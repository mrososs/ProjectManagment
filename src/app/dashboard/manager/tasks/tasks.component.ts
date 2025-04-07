import { Component, OnInit } from '@angular/core';
import { TasksService } from './services/tasks.service';
import { Task } from '../../../core/interfaces/taskModel';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemComponent } from '../../../shared/components/delete-item/delete-item.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: false,
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  searchForm!: FormGroup;
  pageSize = 10;
  pageNumber = 1;
  length = 0;

  constructor(private _taskService: TasksService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
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
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        title,
        status,
      })
      .subscribe();
  }

  fetchTasks(title: string = '') {
    this._taskService
      .getTasks({
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        title,
      })
      .subscribe((res:any) => {
        this.length = res.totalNumberOfRecords; // ✅ Use correct key from API
      });
  }
  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1; // Angular paginator is 0-based
    this.fetchTasks();
  }

    getTasks(): void {
      this._taskService.getTasks({
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
      });
    }
    //delete project
    openDeleteDialog(task: Task): void {
      const dialogRef = this.dialog.open(DeleteItemComponent , {
        data: {name: task.title},
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(task.id);
          this.deleteTask(task.id)
        }
        });
      }
      deleteTask(id : number | undefined): void {
        this._taskService.deleteTask(id).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('project Deleted Successfully');
          },
          error: (err) => {
            this.toastr.error(err.error.message);
          },
          complete: () => { 
            this.getTasks();
          }
        }) 
      }
}

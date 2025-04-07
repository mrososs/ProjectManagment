import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from './services/project.service';
import { debounceTime } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemComponent } from '../../../shared/components/delete-item/delete-item.component';
import { ToastrService } from 'ngx-toastr';
import { IProject } from '../../../core/interfaces/project-task';


import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsComponent implements OnInit {
  searchForm!: FormGroup;
  projects$; // Observable for async pipe
  pageSize = 10;
  pageNumber = 1;
  length = 0;

  constructor(private projectService: ProjectService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.projects$ = this.projectService.projects$; // Initialize projects$ here
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.fetchProjects(); // Initial fetch
    this.projectService.totalPages$.subscribe((totalPages) => {
      this.length = totalPages;
    });

    this.searchForm
      .get('search')
      ?.valueChanges.pipe(debounceTime(300))
      .subscribe((value) => {
        this.fetchProjects(value);
      });
  }

  fetchProjects(searchText: string = ''): void {
    this.projectService.getProjectsForManager({
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      title: searchText || undefined,
    });
  }
  getProjects(): void {
    this.projectService.getProjectsForManager({
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    });
  }
  //delete project
  openDeleteDialog(project: IProject): void {
    const dialogRef = this.dialog.open(DeleteItemComponent , {
      data: {name: project.title},
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(project.id);
        this.deleteProject(project.id)
      }
      });
    }
    deleteProject(id : number | undefined): void {
      this.projectService.deleteProject(id).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success('project Deleted Successfully');
        },
        error: (err) => {
          this.toastr.error(err.error.message);
        },
        complete: () => { 
          this.getProjects();
        }
      }) 
    }
  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1; // Angular paginator is 0-based
    this.fetchProjects();
  }
}

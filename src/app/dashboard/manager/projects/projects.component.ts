import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from './services/project.service';
import { debounceTime } from 'rxjs';
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

  constructor(private projectService: ProjectService) {
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
  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1; // Angular paginator is 0-based
    this.fetchProjects();
  }
}

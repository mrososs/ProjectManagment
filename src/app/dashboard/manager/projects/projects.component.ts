import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from './services/project.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsComponent implements OnInit {
  searchForm!: FormGroup;
  projects$; // Observable for async pipe

  constructor(private projectService: ProjectService) {
    this.projects$ = this.projectService.projects$; // Initialize projects$ here
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.fetchProjects(); // Initial fetch

    this.searchForm.get('search')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.fetchProjects(value);
    });
  }

  fetchProjects(searchText: string = ''): void {
    this.projectService.getProjectsForManager({
      pageSize: 10,
      pageNumber: 1,
      title: searchText || undefined,
    });
  }
}

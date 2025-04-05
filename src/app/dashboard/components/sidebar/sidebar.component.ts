import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageService } from '../../../core/services/storage.service';

interface Menu {
  name: string;
  icon: string;
  route?: string;
  isAdmin?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() collapsedChange = new EventEmitter<boolean>();

  isAdmin = false;
  isCollapsed = false;
  menuList: Menu[] = [];

  private allMenuItems: Menu[] = [
    { name: 'Users',
       icon: 'group',
       route: 'manager/users',
        isAdmin: true
      },
    {
      name: 'Projects',
      icon: 'grid_view',
      route: 'manager/projects',
      isAdmin: true,
    },
    {
      name: 'Projects',
      icon: 'grid_view',
      route: 'employee/project',
      isAdmin: false,
    },
    {
      name: 'Tasks',
      icon: 'favorite',
      route: 'employee/task',
      isAdmin: false,
    },
    {
      name: 'Tasks',
      icon: 'event_note',
      route: 'admin/categories',
      isAdmin: true,
    },

  ];

  constructor(private _storageService: StorageService) {}

  ngOnInit(): void {
    this.isAdmin = this._storageService.isManager(); // Check if the user is a Manager (Admin)
    this.filterMenuItems();
  }

  private filterMenuItems(): void {
    this.menuList = this.allMenuItems.filter((item) =>
      item.isAdmin === undefined ? true : item.isAdmin === this.isAdmin
    );
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem('sidebarCollapsed', this.isCollapsed.toString());
    this.collapsedChange.emit(this.isCollapsed);
  }
}

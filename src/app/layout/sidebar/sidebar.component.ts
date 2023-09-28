import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/module/auth.service';
import { MenuService } from 'src/app/service/module/menu.service';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/management/dashboard',
    title: 'Dashboard',
    icon: 'nc-calendar-60',
    class: '',
  },
  {
    path: '/management/service',
    title: 'Service Banking',
    icon: 'nc-bank',
    class: '',
  },
  {
    path: '/management/employee',
    title: 'Employee',
    icon: 'nc-single-02',
    class: '',
  },
  {
    path: '/management/ticket',
    title: 'Ticket',
    icon: 'nc-book-bookmark',
    class: '',
  },
  {
    path: '/management/screen',
    title: 'Screen',
    icon: 'nc-tv-2',
    class: '',
  },
  {
    path: '/management/menu',
    title: 'Menu',
    icon: 'nc-bullet-list-67',
    class: '',
  },
];

@Component({
  // moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public menuItems: Array<any> = [];
  listMenu: Array<any> = [];
  role: any;

  constructor(
    private menuService: MenuService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.role = this.authService.currentUser().role;
    this.getMenu();
  }

  getMenu() {
    const json = {
      roleCode: [this.role],
    };

    this.menuService.getMenuByRole(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listMenu = res.data;
      }
    });
  }
}

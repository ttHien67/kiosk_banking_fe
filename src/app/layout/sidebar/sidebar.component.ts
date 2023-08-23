import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/management/service',     title: 'Service Banking',         icon:'nc-bank',       class: '' },
    { path: '/management/employee',     title: 'Employee',         icon:'nc-single-02',       class: '' },
    { path: '/management/ticket',     title: 'Ticket',         icon:'nc-book-bookmark',       class: '' },
    { path: '/management/screen',     title: 'Screen',         icon:'nc-book-bookmark',       class: '' }
];

@Component({
    // moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: Array<any> = [];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}

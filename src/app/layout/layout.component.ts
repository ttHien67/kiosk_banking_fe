import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-layouts',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isCondensed = false;
  currentUser: any;
  name: any;
  listMenu: any;
  listPermission: any;
  listParentMenu: any;

  constructor(
  ) { }

  ngOnInit() {
    
    // this.getParentMenu();
  }

  // logout() {
  //   this.authService.logout();
  // }

  // getFullName() {
  //   this.name = this.currentUser.name;
  // }

  // getMenu() {
  //   const roleCode = this.currentUser.roleCode;

  //   this.permissionService.getPermission({ roleCode: [roleCode] }).subscribe(res => {
  //     if (res.errorCode === '0') {
  //       this.listPermission = res.data;
  //       this.menuService.getMenuForCategory(this.listPermission).subscribe(res => {
  //         if (res.errorCode === '0') {
  //           this.listMenu = res.data;

  //         }
  //       })
  //     }
  //   })
  // }

  // getParentMenu() {
  //   this.menuService.getParentMenu({}).subscribe(res => {
  //     if (res.errorCode === '0') {
  //       this.listParentMenu = res.data;
  //     }
  //   })
  // }

  // getMenuChild(id: any) {
  //   const json = {
  //     parentId: id,
  //     // roleCode: this.currentUser.roleCode
  //   }
  //   this.menuService.findAllMenu({ parentId: id }).subscribe(res => {
  //     if (res.errorCode === '0') {
  //       this.listMenu = res.data;
  //     }
  //   })
  // }

}
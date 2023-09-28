import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ScreenModalComponent } from '../screen/screen-modal/screen-modal.component';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from 'src/app/service/module/menu.service';
import { MenuModalComponent } from './menu-modal/menu-modal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  form: any;
  listMenu: Array<any> = [];

  totalSize = 0;
  pageSize = 5;
  pageNumber = 1;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getMenu();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [null],
    });
  }

  get f() {
    return this.form.controls;
  }

  getMenu() {
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      ...this.form.value,
    };
    this.menuService.getMenu(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listMenu = res.data;
        this.totalSize = res.totalRecord;
      }
    });
  }

  refresh() {
    this.ngOnInit();
  }

  search() {
    this.getMenu();
  }

  delete(item: any) {
    if (item) {
      Swal.fire({
        title: 'Warning!',
        text: 'Data is not restore after deleting',
        icon: 'error',
        confirmButtonText: 'OK',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancel',
      }).then((res) => {
        if (res.value) {
          const json = {
            id: item.id,
          };
          this.menuService.deleteMenu(json).subscribe(
            (res) => {
              if (res.errorCode === '0') {
                this.toastService.success(res.errorDesc);
                this.getMenu();
              } else {
                this.toastService.error(res.errorDesc);
              }
            },
            (err) => {
              this.toastService.error(err, 'Notification');
            }
          );
        }
      });
      return;
    }
  }

  openModal(item: any, type: any) {
    const modalRef = this.modalService.open(MenuModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });
    if (item) {
      modalRef.componentInstance.item = item;
    }

    modalRef.componentInstance.type = type;

    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();
      this.getMenu();
    });
  }

  changePageSize(item: any) {
    this.pageSize = item;
    this.getMenu();
  }

  changePage(size: any) {
    this.pageNumber = size;
    this.getMenu();
  }
}

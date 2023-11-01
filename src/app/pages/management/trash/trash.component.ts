import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/service/module/employee.service';
import { ServiceBankingService } from 'src/app/service/module/service-banking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss'],
})
export class TrashComponent implements OnInit {
  active = 1;

  pageNumber = 1;
  pageSize = 10;
  totalSize = 0;

  form: any;
  listEmployee: Array<any> = [];
  listService: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private serviceBankingService: ServiceBankingService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getEmployee();
  }

  initForm() {
    this.form = this.formBuilder.group({
      deletedDate: [null],
    });
  }

  get f() {
    return this.form.controls;
  }

  getEmployee() {
    const json = {
      ...this.form.value,
      deleted: 1,
    };

    this.employeeService.getEmployee(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listEmployee = res.data;
        this.totalSize = res.totalRecord;
      }
    });
  }

  getService() {
    const json = {
      ...this.form.value,
      deleted: 1,
    };

    this.serviceBankingService.getService(json).subscribe(
      (res) => {
        if (res.errorCode === '0') {
          this.listService = res.data;
          this.totalSize = res.totalRecord;
        }
      },
      (err) => console.log(err)
    );
  }

  restore(item: any) {
    if (item) {
      Swal.fire({
        title: 'Warning!',
        text: 'Data will be restored',
        icon: 'info',
        confirmButtonText: 'OK',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancel',
      }).then((res) => {
        if (res.value) {
          const json = {
            id: item.id,
            deleted: 0,
          };
          if (this.active === 1) {
            this.employeeService.restoreEmployee(json).subscribe(
              (res) => {
                if (res.errorCode === '0') {
                  this.toastService.success(res.errorDesc);
                  this.getEmployee();
                } else {
                  this.toastService.error(res.errorDesc);
                }
              },
              (err) => {
                this.toastService.error(err, 'Notification');
              }
            );
          } else if (this.active === 2) {
            this.serviceBankingService.restoreService(json).subscribe(
              (res) => {
                if (res.errorCode === '0') {
                  this.toastService.success(res.errorDesc);
                  this.getService();
                } else {
                  this.toastService.error(res.errorDesc);
                }
              },
              (err) => {
                this.toastService.error(err, 'Notification');
              }
            );
          }
        }
      });
      return;
    }
  }

  remove(item: any) {
    if (item) {
      Swal.fire({
        title: 'Warning!',
        text: 'Data is not restore after deleting ',
        icon: 'error',
        confirmButtonText: 'OK',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancel',
      }).then((res) => {
        if (res.value) {
          const json = {
            id: item.id,
            deleted: 1,
          };

          if (this.active === 1) {
            this.employeeService.removeEmployee(json).subscribe(
              (res) => {
                if (res.errorCode === '0') {
                  this.toastService.success(res.errorDesc);
                  this.getEmployee();
                } else {
                  this.toastService.error(res.errorDesc);
                }
              },
              (err) => {
                this.toastService.error(err, 'Notification');
              }
            );
          } else if (this.active === 2) {
            this.serviceBankingService.removeService(json).subscribe(
              (res) => {
                if (res.errorCode === '0') {
                  this.toastService.success(res.errorDesc);
                  this.getService();
                } else {
                  this.toastService.error(res.errorDesc);
                }
              },
              (err) => {
                this.toastService.error(err, 'Notification');
              }
            );
          }
        }
      });
      return;
    }
  }

  getTabData() {
    if (this.active === 1) {
      this.getEmployee();
    } else if (this.active === 2) {
      this.getService();
    }
  }

  refresh() {
    this.f.deletedDate.patchValue(null);
    this.getTabData();
  }

  search() {
    this.getTabData();
  }

  navChange(event: any) {
    this.active = event?.nextId;
    if (event?.nextId === 1) {
      this.getEmployee();
    } else if (event?.nextId === 2) {
      this.getService();
    }
  }

  changePage(event: any) {}

  changePageSize(event: any) {}
}

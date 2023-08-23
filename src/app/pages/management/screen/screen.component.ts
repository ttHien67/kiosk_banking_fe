import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ScreenService } from 'src/app/service/module/screen.service';
import { ScreenModalComponent } from './screen-modal/screen-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {

  form: any;
  listScreen: Array<any> = [];

  totalSize = 0;
  pageSize = 5;
  pageNumber = 1;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private screenService: ScreenService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getScreen();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [null],
    })
  }

  get f() {
    return this.form.controls;
  }

  getScreen() {
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      ...this.form.value
    }

    this.screenService.getScreen(json).subscribe(res => {
      if(res.errorCode === '0'){
        this.listScreen = res.data;
        this.totalSize = res.totalRecord;
      }
    })
  }

  refresh() {
    this.ngOnInit();
  }

  search() {
    this.getScreen();
  }

  delete(item: any){
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
          }
          this.screenService.deleteScreen(json).subscribe(res => {
            if (res.errorCode === '0') {
              this.toastService.success(res.errorDesc);
              this.getScreen();
            } else {
              this.toastService.error(res.errorDesc);
            }
          }, err => {
            this.toastService.error(err, 'Notification');
          });
        }
      })
      return;
    }
  }

  openModal(item: any, type: any) {
    const modalRef = this.modalService.open(ScreenModalComponent, {centered: true, size: 'lg', backdrop: 'static'});
    if(item){
      modalRef.componentInstance.item = item;
    }

    modalRef.componentInstance.type = type;

    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();
      this.getScreen();
    })
  }

  changePageSize(item: any){
    this.pageSize = item;
    this.getScreen();
  }

  changePage(size: any){
    this.pageNumber = size;
    this.getScreen();
  }

}

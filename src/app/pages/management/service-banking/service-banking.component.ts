import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceBankingModalComponent } from './service-banking-modal/service-banking-modal.component';
import { ServiceBankingService } from 'src/app/service/module/service-banking.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-banking',
  templateUrl: './service-banking.component.html',
  styleUrls: ['./service-banking.component.scss']
})
export class ServiceBankingComponent implements OnInit {

  form: any;
  listService: Array<any> = [];

  totalSize = 0;
  pageSize = 5;
  pageNumber = 1;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private serviceBankingService: ServiceBankingService,
    private toastService: ToastrService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getService();
  }


  initForm() {
    this.form = this.formBuilder.group({
      name: [null],
      description: [null]
    })
  }

  get f() {
    return this.form.controls;
  }

  getService() {
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      ...this.form.value
    }
    this.serviceBankingService.getService(json).subscribe(res => {
      if(res.errorCode === '0'){
        this.listService = res.data;
        this.totalSize = res.totalRecord;
      }
    })
  }

  refresh() {
    this.ngOnInit();
  }

  search() {
    this.getService();
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
          this.serviceBankingService.deleteService(json).subscribe(res => {
            if (res.errorCode === '0') {
              this.toastService.success(res.errorDesc);
              this.getService();
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
    const modalRef = this.modalService.open(ServiceBankingModalComponent, {centered: true, size: 'lg', backdrop: 'static'});
    if(item){
      modalRef.componentInstance.item = item;
    }

    modalRef.componentInstance.type = type;
    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();
      this.getService();
    })
  }

  changePageSize(item: any){
    this.pageSize = item;
  }

  changePage(item: any){
    this.pageNumber = item;
  }

}

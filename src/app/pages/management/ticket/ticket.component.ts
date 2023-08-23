import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/service/module/employee.service';
import { ServiceBankingService } from 'src/app/service/module/service-banking.service';
import { TicketService } from 'src/app/service/module/ticket.service';
import { TicketModalComponent } from './ticket-modal/ticket-modal.component';
import { AuthService } from 'src/app/service/module/auth.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  form: any;
  listService: any;
  listEmployee: Array<any> = [];
  listTicket: Array<any> = [];

  totalSize = 0;
  pageSize = 5;
  pageNumber = 1;
  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private employeeService: EmployeeService,
    private toastService: ToastrService,
    private serviceBankingService: ServiceBankingService,
    private ticketService: TicketService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser().userId;
    this.initForm();
    this.getService();
    this.getEmployee();
    this.getTicket();
    console.log(this.authService.currentUser());
    
    
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [null],
      phone: [null],
      date: [null],
      serviceId: [null],
      employeeId: [null]
    })
  }

  get f() {
    return this.form.controls;
  }

  getEmployee() {
    this.employeeService.getEmployee({}).subscribe(res => {
      if(res.errorCode === '0'){
        this.listEmployee = res.data;
      }
    })
  }

  getService() {
    this.serviceBankingService.getService({}).subscribe(res => {
      if(res.errorCode === '0'){
        this.listService = res.data;
      }
    })
  }

  getTicket() {
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      accountId: this.currentUser,
      ...this.form.value
    }

    this.ticketService.getTicket(json).subscribe(res => {
      if(res.errorCode === '0'){
        this.listTicket = res.data;
        this.totalSize = res.totalRecord;
      }
    })
  }

  refresh() {
    this.ngOnInit();
  }

  search() {
    this.getTicket();
  }

  // delete(item: any){
  //   if (item) {
  //     Swal.fire({
  //       title: 'Warning!',
  //       text: 'Data is not restore after deleting',
  //       icon: 'error',
  //       confirmButtonText: 'OK',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonText: 'Cancel',
  //     }).then((res) => {
  //       if (res.value) {
  //         const json = {
  //           id: item.id,
  //         }
  //         this.employeeService.deleteEmployee(json).subscribe(res => {
  //           if (res.errorCode === '0') {
  //             this.toastService.success(res.errorDesc);
  //             this.getEmployee();
  //           } else {
  //             this.toastService.error(res.errorDesc);
  //           }
  //         }, err => {
  //           this.toastService.error(err, 'Notification');
  //         });
  //       }
  //     })
  //     return;
  //   }
  // }

  openModal(item: any, type: any) {
    const modalRef = this.modalService.open(TicketModalComponent, {centered: true, size: 'lg', backdrop: 'static'});
    if(item){
      modalRef.componentInstance.item = item;
    }

    modalRef.componentInstance.type = type;
    modalRef.componentInstance.listService = this.listService;
    modalRef.componentInstance.listEmployee = this.listEmployee;

    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();
      this.getTicket();
    })
  }

  changePageSize(item: any){
    this.pageSize = item;
    this.getTicket();
  }

  changePage(size: any){
    this.pageNumber = size;
    this.getTicket();
  }

}

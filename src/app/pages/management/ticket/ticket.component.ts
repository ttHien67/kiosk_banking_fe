import {
  Component,
  EventEmitter,
  Injectable,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/service/module/employee.service';
import { ServiceBankingService } from 'src/app/service/module/service-banking.service';
import { TicketService } from 'src/app/service/module/ticket.service';
import { TicketModalComponent } from './ticket-modal/ticket-modal.component';
import { AuthService } from 'src/app/service/module/auth.service';
import { SharedService } from 'src/app/service/module/shared.service';
import { WebSocketService } from 'src/app/service/module/websocket.service';
import {
  NgxScannerQrcodeService,
  ScannerQRCodeConfig,
  ScannerQRCodeSelectedFiles,
} from 'ngx-scanner-qrcode';
import { log } from 'console';
import { createFileType, downLoadFile } from 'src/app/utils/export.util';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  form: any;
  listService: any;
  listEmployee: Array<any> = [];
  listTicket: Array<any> = [];

  totalSize = 0;
  pageSize = 10;
  pageNumber = 1;
  currentUser: any;
  accountRole: any;
  synth: SpeechSynthesis;

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    },
  };

  @Output() dataSent = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private employeeService: EmployeeService,
    private toastService: ToastrService,
    private serviceBankingService: ServiceBankingService,
    private ticketService: TicketService,
    private authService: AuthService,
    private sharedService: SharedService,
    private websocketService: WebSocketService,
    private qrcode: NgxScannerQrcodeService
  ) {
    this.synth = window.speechSynthesis;
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUser().userId;
    this.accountRole = this.authService.currentUser().role;
    this.initForm();
    this.getService();
    this.getEmployee();
    this.getTicket();
    this.connect();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [null],
      phone: [null],
      date: [null],
      serviceId: [null],
      employeeId: [null],
    });
  }

  get f() {
    return this.form.controls;
  }

  getEmployee() {
    this.employeeService.getEmployee({}).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listEmployee = res.data;
      }
    });
  }

  getService() {
    this.serviceBankingService.getService({}).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listService = res.data;
      }
    });
  }

  getTicket() {
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      accountId: this.accountRole === 'EMPLOYEE' ? this.currentUser : null,
      ...this.form.value,
    };

    this.ticketService.getTicket(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listTicket = res.data;
        this.totalSize = res.totalRecord;
      }
    });
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
    const modalRef = this.modalService.open(TicketModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });
    if (item) {
      modalRef.componentInstance.item = item;
    }

    modalRef.componentInstance.type = type;
    modalRef.componentInstance.listService = this.listService;
    modalRef.componentInstance.listEmployee = this.listEmployee;

    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();
      this.getTicket();
    });
  }

  changePageSize(item: any) {
    this.pageSize = item;
    this.getTicket();
  }

  changePage(size: any) {
    this.pageNumber = size;
    this.getTicket();
  }

  speak(text: string, lang: string = 'en-US'): void {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    this.synth.speak(utterance);
  }

  speakText(item: any) {
    this.ticketService.fakeNotification(item).subscribe((res) => {});

    const text = `Mời quý khách hàng số ${item.code} đến quầy số ${item.room}`;
    this.speak(text, 'vi-VN');
  }

  connect(): void {
    // this.websocketService.connectToSearch();

    // subscribe receives the value.
    this.websocketService.searcchTicket.subscribe((data) => {
      if (data) {
        this.ticketService.getTicket(data).subscribe((res) => {
          if (res.errorCode === '0') {
            this.listTicket = res.data;
            this.totalSize = res.totalRecord;
          }
        });
      }
    });
  }

  public onSelects(files: any) {
    this.qrcode
      .loadFiles(files)
      .subscribe((res: ScannerQRCodeSelectedFiles[]) => {
        this.qrCodeResult = res;
      });
  }

  searchByQrCode(event: any) {
    const json = JSON.parse(event[0].value);

    this.ticketService.getTicket(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listTicket = res.data;
      }
    });
  }

  getRange(limit: number): number[] {
    return Array.from({ length: limit }, (_, index) => index);
  }

  export() {
    this.ticketService.export({ fileType: 'pdf' }).subscribe(
      (res) => {
        if (res) {
          downLoadFile(
            res,
            createFileType('pdf'),
            'Ticket_' + new Date().toDateString()
          );
        }
      },
      (error) => {
        this.toastService.error('Export error');
      }
    );
  }
}

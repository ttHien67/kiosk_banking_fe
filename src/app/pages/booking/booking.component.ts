import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceBankingService } from 'src/app/service/module/service-banking.service';
import { BookingModalComponent } from './booking-modal/booking-modal.component';
import { EmployeeService } from 'src/app/service/module/employee.service';
import { QrcodeGenerationComponent } from './qrcode-generation/qrcode-generation.component';
import { NgxScannerQrcodeService, ScannerQRCodeConfig, ScannerQRCodeSelectedFiles } from 'ngx-scanner-qrcode';
import { ScreenService } from 'src/app/service/module/screen.service';
import { TicketService } from 'src/app/service/module/ticket.service';
import { CommentModalComponent } from './comment-modal/comment-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  listService: any;
  listEmployee: any;
  listScreen: Array<any> = [];
  backgroundImage: any;

  private currentImage = 'default-background.jpg';

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public config: ScannerQRCodeConfig = {
    constraints: { 
      video: {
        width: window.innerWidth
      }
    } 
  };

  constructor(
    private serviceBankingService: ServiceBankingService,
    private modalService: NgbModal,
    private qrcode: NgxScannerQrcodeService,
    private screenService: ScreenService,
    private ticketSerrvice: TicketService,
    private toastService: ToastrService

  ) { }

  ngOnInit() {
    this.getScreen();
    this.getService();
  }

  updateBackgroundImage() {
    
    let timeDifferenceInMillis = 1000000;
    const currentTime: any = this.getTime();
    const currentDate = this.getDate();
    
    for(let item of this.listScreen){
      if(currentTime > item.startTime && currentTime < item.endTime){
        this.currentImage = item.image;
        const startTime : any = new Date(`1970-01-01 ${item.startTime}`);
        const endTime : any = new Date(`1970-01-01 ${item.endTime}`);
        timeDifferenceInMillis = endTime - startTime;
      }
      
    }
    
    for(let item of this.listScreen){ 
      if(currentDate >= item?.startDate && currentDate < item?.endDate){
        this.currentImage = item.image;
        const startDate : any = new Date(item?.startDate);
        const endDate : any = new Date(item?.endDate);
        timeDifferenceInMillis = endDate - startDate;
      }
    }
    
    this.backgroundImage = `url(\'assets/img/${this.currentImage}\')`;
    setTimeout(() => this.updateBackgroundImage(), 10000);
  }

  getService() {
    this.serviceBankingService.getService({}).subscribe(res => {
      if(res.errorCode === '0'){
        this.listService = res.data;
      }
    })
  }

  getScreen() {
    this.screenService.getScreen({}).subscribe(res => {
      if(res.errorCode === '0'){
        this.listScreen = res.data;

        this.updateBackgroundImage();
      }
    })
  }

  getTime() {
    const d = new Date();
    return (d.getHours() + ':' + (d.getMinutes()) + ':' + d.getSeconds());
  }

  getDate() {
    const d = new Date();
    const month = d.getMonth() + 1 < 10 ? ("0" + (d.getMonth() + 1)) : (d.getMonth() + 1);
    return (d.getFullYear() + '-' + month + '-' + d.getDate());

  }

  openModal(item: any){
    const modalRef = this.modalService.open(BookingModalComponent, {centered: true, size: 'lg', backdrop: 'static'});

    modalRef.componentInstance.item = item;
    modalRef.componentInstance.listService = this.listService;
    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();

      const modalQrCode = this.modalService.open(QrcodeGenerationComponent, { centered: true, size: 'lg', backdrop: 'static' });
      modalQrCode.componentInstance.data = receive;
      modalQrCode.componentInstance.passEntry.subscribe((receivedEntry: any) => {
        this.modalService.dismissAll();
      })
    })
  }

  public onSelects(files: any) {
    this.qrcode.loadFiles(files).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
      this.qrCodeResult = res;
    });
  }

  show(event: any) {
    const json = {
      code: JSON.parse(event[0].value).code,
      name: JSON.parse(event[0].value).name,
      phone: JSON.parse(event[0].value).phone,
    }
    this.ticketSerrvice.getTicket(json).subscribe(res => {
      if (res.errorCode === '0') {
        if(res.data[0]){
          if (res.data[0].status === 2) {
            const modalRef = this.modalService.open(CommentModalComponent, { centered: true, size: 'lg', backdrop: 'static' });
            modalRef.componentInstance.item = res.data[0];
            modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
              this.modalService.dismissAll();
            })
          } else {
            this.toastService.error("Your transaction's status hasn't been done");
          }
        }else {
          this.toastService.error("QR code is invalid");
        }
      }
    })
  }

}

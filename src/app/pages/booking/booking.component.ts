import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceBankingService } from 'src/app/service/module/service-banking.service';
import { BookingModalComponent } from './booking-modal/booking-modal.component';
import { EmployeeService } from 'src/app/service/module/employee.service';
import { QrcodeGenerationComponent } from './qrcode-generation/qrcode-generation.component';
import { NgxScannerQrcodeService, ScannerQRCodeConfig, ScannerQRCodeSelectedFiles } from 'ngx-scanner-qrcode';
import { ScreenService } from 'src/app/service/module/screen.service';

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

  private currentImage: any;

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
    private screenService: ScreenService

  ) { }

  ngOnInit() {
    this.getScreen();
    this.getService();
  }

  updateBackgroundImage() {
    
    let timeDifferenceInMillis = 0;
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
    setTimeout(() => this.updateBackgroundImage(), timeDifferenceInMillis);
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

  searchByQrCode(event: any){
    console.log(JSON.parse(event[0].value));
    
  }

}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceBankingService } from 'src/app/service/module/service-banking.service';
import { BookingModalComponent } from './booking-modal/booking-modal.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  listService: any;

  constructor(
    private serviceBankingService: ServiceBankingService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getService();
  }

  getService() {
    this.serviceBankingService.getService({}).subscribe(res => {
      if(res.errorCode === '0'){
        this.listService = res.data;
      }
    })
  }

  openModal(item: any){
    const modalRef = this.modalService.open(BookingModalComponent, {centered: true, size: 'lg', backdrop: 'static'});

    modalRef.componentInstance.item = item;
    modalRef.componentInstance.listService = this.listService;
    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();
    })
  }

}

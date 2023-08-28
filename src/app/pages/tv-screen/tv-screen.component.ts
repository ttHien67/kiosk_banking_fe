import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SharedService } from 'src/app/service/module/shared.service';
import { TicketService } from 'src/app/service/module/ticket.service';
import { WebSocketService } from 'src/app/service/module/websocket.service';
import { TicketComponent } from '../management/ticket/ticket.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-tv-screen',
  templateUrl: './tv-screen.component.html',
  styleUrls: ['./tv-screen.component.scss']
})
export class TvScreenComponent implements OnInit {
  listTicket: any;
  Text: any = [];
  receivedData: any;
  listData: any;
  subscription!: Subscription;

  constructor(
    private ticketService: TicketService,
    private sharedService: SharedService,
    private websocketService: WebSocketService,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    document.body.style.backgroundImage = 'url(\'assets/img/night-background.webp\')';
    document.body.style.backgroundSize = "cover";
    this.getTicket();
    this.connect();

    this.connectToNotify();
    
    this.sharedService.speakNotification.subscribe(res => {
      console.log(res);
      
    })
  }

  getDate() {
    const d = new Date();
    const month = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
    return (d.getFullYear() + '-' + month + '-' + d.getDate());

  }

  getTicket(){
    const json = {
      date: this.getDate()
    }

    this.ticketService.getTicketForTV(json).subscribe(res => {
      if(res.errorCode === '0'){
        this.listTicket = res.data;
      }
    })
  }

  connect(): void {

    this.websocketService.connectToUpdate();
    this.websocketService.connectToCreate();

    // subscribe receives the value.
    this.websocketService.notificationMessage.subscribe((data) => {
      this.getTicket();
    });
  }

  connectToNotify() {
    this.websocketService.connectToNotify();

    this.websocketService.notificationMessage.subscribe((data) => {
      console.log(data);

      this.openModal(data);
      
    });
  }

  openModal(item: any) {
    const modalRef = this.modalService.open(NotificationComponent, {centered: true, size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.data = item;

    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();
    })
  }
  

  disconnect(): void {
    this.websocketService.disconnect();
  }

}

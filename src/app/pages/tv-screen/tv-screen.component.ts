import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SharedService } from 'src/app/service/module/shared.service';
import { TicketService } from 'src/app/service/module/ticket.service';
import { WebSocketService } from 'src/app/service/module/websocket.service';
import { TicketComponent } from '../management/ticket/ticket.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from './notification/notification.component';
import { ScreenService } from 'src/app/service/module/screen.service';

@Component({
  selector: 'app-tv-screen',
  templateUrl: './tv-screen.component.html',
  styleUrls: ['./tv-screen.component.scss'],
})
export class TvScreenComponent implements OnInit {
  listTicket: any;
  Text: any = [];
  receivedData: any;
  listData: any;
  subscription!: Subscription;

  private currentImage = 'default-background.jpg';
  listScreen: any;
  backgroundImage: any;

  constructor(
    private ticketService: TicketService,
    private sharedService: SharedService,
    private websocketService: WebSocketService,
    private modalService: NgbModal,
    private screenService: ScreenService
  ) {}

  ngOnInit() {
    this.getScreen();
    this.getTicket();
    this.connect();

    this.sharedService.speakNotification.subscribe((res) => {
      console.log(res);
    });
  }

  getDate() {
    const d = new Date();
    const month =
      d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    const date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    console.log(d.getDate());

    return d.getFullYear() + '-' + month + '-' + date;
  }

  getTime() {
    const d = new Date();
    return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  getTicket() {
    const json = {
      date: this.getDate(),
    };

    this.ticketService.getTicketForTV(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listTicket = res.data;
      }
    });
  }

  getScreen() {
    this.screenService.getScreen({}).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listScreen = res.data;

        this.updateBackgroundImage();
      }
    });
  }

  updateBackgroundImage() {
    let timeDifferenceInMillis = 10000;
    const currentTime: any = new Date(this.getDate() + ' ' + this.getTime());
    const currentDate = this.getDate();

    for (let item of this.listScreen) {
      if (item.startTime === null) {
        continue;
      }
      const startTime: any = new Date(this.getDate() + ' ' + item.startTime);
      const endTime: any = new Date(this.getDate() + ' ' + item.endTime);

      if (currentTime >= startTime && currentTime <= endTime) {
        this.currentImage = item.imageBase64;
        timeDifferenceInMillis = endTime - currentTime;
      }
    }

    for (let item of this.listScreen) {
      if (item.startDate === null) {
        continue;
      }
      if (currentDate >= item?.startDate && currentDate <= item?.endDate) {
        this.currentImage = item.imageBase64;
        const startDate: any = new Date(item?.startDate);
        const endDate: any = new Date(item?.endDate);
        timeDifferenceInMillis = endDate - startDate;
      }
    }

    this.backgroundImage = `url(${this.currentImage})`;
    setTimeout(() => this.getScreen(), timeDifferenceInMillis);
  }

  connect(): void {
    this.websocketService.connectForTV();

    this.websocketService.updateStatus.subscribe((data) => {
      this.getTicket();
    });

    this.websocketService.createForTV.subscribe((data) => {
      this.getTicket();
    });
  }

  openModal(item: any) {
    const modalRef = this.modalService.open(NotificationComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = item;

    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();
    });
  }

  disconnect(): void {
    this.websocketService.disconnect();
  }
}

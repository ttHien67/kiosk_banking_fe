import { EventEmitter, Injectable } from '@angular/core';
import {
  WEBSOCKET_CREATE_PRIVATE_TOPIC,
  WEBSOCKET_CREATE_TOPIC,
  WEBSOCKET_ENDPOINT,
  WEBSOCKET_NOTIFICATION_TOPIC,
  WEBSOCKET_SEARCH_TICKET_TOPIC,
  WEBSOCKET_UPDATE_TOPIC,
} from 'src/app/shares/contants/base-url.contants';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  stompClient: any;
  notificationMessage = new EventEmitter();
  searcchTicket = new EventEmitter();
  updateStatus = new EventEmitter();
  createForTV = new EventEmitter();

  constructor(private authService: AuthService) {}

  connectToCreate(): void {
    const userId = this.authService.currentUser().userId;
    const ws = new SockJS(WEBSOCKET_ENDPOINT);
    this.stompClient = Stomp.over(ws);
    const _this = this;

    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(
        '/user/' + userId + WEBSOCKET_CREATE_PRIVATE_TOPIC,
        function (sdkEvent: any) {
          console.log(sdkEvent);

          _this.onMessageReceived(sdkEvent);
        }
      );

      _this.stompClient.subscribe(
        WEBSOCKET_SEARCH_TICKET_TOPIC,
        function (sdkEvent: any) {
          _this.onTicketReceived(sdkEvent);
        }
      );
    });
  }

  connectForTV(): void {
    const ws = new SockJS(WEBSOCKET_ENDPOINT);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(
        WEBSOCKET_CREATE_TOPIC,
        function (sdkEvent: any) {
          _this.onMessageCreateToTV(sdkEvent);
        }
      );

      _this.stompClient.subscribe(
        WEBSOCKET_UPDATE_TOPIC,
        function (sdkEvent: any) {
          _this.onUpdateStatus(sdkEvent);
        }
      );
    });
  }

  // connectToUpdateStatus(): void {
  //   const ws = new SockJS(WEBSOCKET_ENDPOINT);
  //   this.stompClient = Stomp.over(ws);
  //   const _this = this;
  //   _this.stompClient.connect({}, function (frame: any) {
  //     _this.stompClient.subscribe(
  //       WEBSOCKET_UPDATE_TOPIC,
  //       function (sdkEvent: any) {
  //         _this.onUpdateStatus(sdkEvent);
  //       }
  //     );
  //   });
  // }

  connectToNotify(): void {
    const ws = new SockJS(WEBSOCKET_ENDPOINT);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(
        WEBSOCKET_NOTIFICATION_TOPIC,
        function (sdkEvent: any) {
          _this.onMessageReceived(sdkEvent);
        }
      );
    });
  }

  connectToSearch(): void {
    const ws = new SockJS(WEBSOCKET_ENDPOINT);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(
        WEBSOCKET_SEARCH_TICKET_TOPIC,
        function (sdkEvent: any) {
          _this.onTicketReceived(sdkEvent);
        }
      );
    });
  }

  disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // errorCallback(error: any){
  //     console.error("ErrorCallback -> "+ error);
  //     setTimeout(() => {
  //         this.connect();
  //     }, 5000);
  // }

  onMessageReceived(message: any) {
    this.notificationMessage.emit(JSON.parse(message.body));
  }

  onTicketReceived(message: any) {
    this.searcchTicket.emit(JSON.parse(message.body));
  }

  onUpdateStatus(message: any) {
    this.updateStatus.emit(JSON.parse(message.body));
  }

  onMessageCreateToTV(message: any) {
    this.createForTV.emit(JSON.parse(message.body));
  }
}

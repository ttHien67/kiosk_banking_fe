import { EventEmitter, Injectable } from '@angular/core';
import {
  WEBSOCKET_CREATE_TOPIC,
  WEBSOCKET_ENDPOINT,
  WEBSOCKET_NOTIFICATION_TOPIC,
  WEBSOCKET_SEARCH_TICKET_TOPIC,
  WEBSOCKET_UPDATE_TOPIC,
} from 'src/app/shares/contants/base-url.contants';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  stompClient: any;
  notificationMessage = new EventEmitter();
  searcchTicket = new EventEmitter();

  constructor() {}

  connectToCreate(): void {
    console.log('Websocket Connection');
    const ws = new SockJS(WEBSOCKET_ENDPOINT);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(
        WEBSOCKET_CREATE_TOPIC,
        function (sdkEvent: any) {
          _this.onMessageReceived(sdkEvent);
        }
      );
    });
  }

  connectToUpdate(): void {
    console.log('Websocket Connection');
    const ws = new SockJS(WEBSOCKET_ENDPOINT);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(
        WEBSOCKET_UPDATE_TOPIC,
        function (sdkEvent: any) {
          _this.onMessageReceived(sdkEvent);
        }
      );
    });
  }

  connectToNotify(): void {
    console.log('Websocket Connection');
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
    console.log('Websocket Connection');
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
    console.log('Message received from server: ' + message);
    this.notificationMessage.emit(JSON.parse(message.body));
  }

  onTicketReceived(message: any) {
    this.searcchTicket.emit(JSON.parse(message.body));
  }
}

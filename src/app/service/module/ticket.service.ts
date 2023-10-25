import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  private header = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  createTicket(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/createTicket',
      json,
      { headers: this.header }
    );
  }

  fakeCreateTicket(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/fakeCreateTicket',
      json,
      { headers: this.header }
    );
  }

  fakeNotification(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/fakeNotification',
      json,
      { headers: this.header }
    );
  }

  searchTicketForNotification(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/searchTicketForNotification',
      json,
      { headers: this.header }
    );
  }

  getTicket(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.TICKET + '/getTicket',
      json,
      { headers: this.header }
    );
  }

  getTicketForTV(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.TICKET + '/getTicketForTV',
      json,
      { headers: this.header }
    );
  }

  getAllTicket(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.TICKET + '/getAllTicket',
      json,
      { headers: this.header }
    );
  }

  updateTicket(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/updateTicket',
      json,
      { headers: this.header }
    );
  }

  evaluateTicket(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/evaluateTicket',
      json,
      { headers: this.header }
    );
  }

  deleteTicket(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/deleteTicket',
      json,
      { headers: this.header }
    );
  }

  statisticMonthly(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/statisticMonthly',
      json,
      { headers: this.header }
    );
  }

  getCountTicket(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/getCountTicket',
      json,
      { headers: this.header }
    );
  }

  getTicketDataForEmployee(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/getTicketDataForEmployee',
      json,
      { headers: this.header }
    );
  }

  export(json: any) {
    return this.http.post(CommandURL.TICKET + '/export', json, {
      responseType: 'arraybuffer',
      headers: new HttpHeaders(),
    });
  }
}

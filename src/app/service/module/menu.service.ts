import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}

  private header = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  createMenu(json: any) {
    return this.http.post<BaseResponse>(CommandURL.MENU + '/createMenu', json, {
      headers: this.header,
    });
  }

  getMenu(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.MENU + '/getMenu',
      json,
      { headers: this.header }
    );
  }

  getMenuByRole(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.MENU + '/getMenuByRole',
      json,
      { headers: this.header }
    );
  }

  updateMenu(json: any) {
    return this.http.post<BaseResponse>(CommandURL.MENU + '/updateMenu', json, {
      headers: this.header,
    });
  }

  deleteMenu(json: any) {
    return this.http.post<BaseResponse>(CommandURL.MENU + '/deleteMenu', json, {
      headers: this.header,
    });
  }
}

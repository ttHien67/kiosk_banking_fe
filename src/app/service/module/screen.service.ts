import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseListResponse } from "src/app/models/base-list-response.model";
import { BaseResponse } from "src/app/models/base-response.model";
import { CommandURL } from "../api-command";

@Injectable({
    providedIn: 'root'
})

export class ScreenService {
    constructor(
        private http: HttpClient
    ){}

    private header = new HttpHeaders({
        'Content-Type': 'application/json',
    })

    createScreen(json : any) {
        return this.http.post<BaseResponse>(CommandURL.SCREEN + '/createScreen', json, {headers: this.header});
    }

    getScreen(json : any) {
        return this.http.post<BaseListResponse>(CommandURL.SCREEN + '/getScreen', json, {headers: this.header});
    }

    updateScreen(json: any) {
        return this.http.post<BaseResponse>(CommandURL.SCREEN + '/updateScreen', json, {headers: this.header});
    }

    deleteScreen(json: any) {
        return this.http.post<BaseResponse>(CommandURL.SCREEN + '/deleteScreen', json, {headers: this.header});
    }
}
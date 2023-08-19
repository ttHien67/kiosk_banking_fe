import { Injectable } from "@angular/core";
import { BaseResponse } from "src/app/models/base-response.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CommandURL } from "../api-command";
import { BaseListResponse } from "src/app/models/base-list-response.model";

@Injectable({
    providedIn: 'root'
})

export class ServiceBankingService {
    constructor(
        private http: HttpClient
    ){}

    private header = new HttpHeaders({
        'Content-Type': 'application/json' 
    })

    createService(json : any) {
        return this.http.post<BaseResponse>(CommandURL.SERVICE + '/createService', json, {headers: this.header});
    }

    getService(json : any) {
        return this.http.post<BaseListResponse>(CommandURL.SERVICE + '/getService', json, {headers: this.header});
    }

    updateService(json : any) {
        return this.http.post<BaseResponse>(CommandURL.SERVICE + '/updateService', json, {headers: this.header});
    }

    deleteService(json : any) {
        return this.http.post<BaseResponse>(CommandURL.SERVICE + '/deleteService', json, {headers: this.header});
    }
}
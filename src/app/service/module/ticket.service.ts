import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseListResponse } from "src/app/models/base-list-response.model";
import { BaseResponse } from "src/app/models/base-response.model";
import { CommandURL } from "../api-command";

@Injectable({
    providedIn: 'root'
})

export class TicketService {
    constructor(
        private http: HttpClient
    ){}

    private header = new HttpHeaders({
        'Content-Type': 'application/json',
    })

    createTicket(json : any) {
        return this.http.post<BaseResponse>(CommandURL.TICKET + '/createTicket', json, {headers: this.header});
    }

    getTicket(json : any) {
        return this.http.post<BaseListResponse>(CommandURL.TICKET + '/getTicket', json, {headers: this.header});
    }

    getAllTicket(json : any) {
        return this.http.post<BaseListResponse>(CommandURL.TICKET + '/getAllTicket', json, {headers: this.header});
    }

    updateTicket(json: any) {
        return this.http.post<BaseResponse>(CommandURL.TICKET + '/updateTicket', json, {headers: this.header});
    }

    evaluateTicket(json: any) {
        return this.http.post<BaseResponse>(CommandURL.TICKET + '/evaluateTicket', json, {headers: this.header});
    }

    deleteTicket(json: any) {
        return this.http.post<BaseResponse>(CommandURL.TICKET + '/deleteTicket', json, {headers: this.header});
    }
}
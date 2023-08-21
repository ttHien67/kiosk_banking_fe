import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseListResponse } from "src/app/models/base-list-response.model";
import { BaseResponse } from "src/app/models/base-response.model";
import { CommandURL } from "../api-command";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    constructor(
        private http: HttpClient
    ){}

    private header = new HttpHeaders({
        'Content-Type': 'application/json',
    })

    createEmployee(json : any) {
        return this.http.post<BaseResponse>(CommandURL.EMPLOYEE + '/createEmployee', json, {headers: this.header});
    }

    getEmployee(json : any) {
        return this.http.post<BaseListResponse>(CommandURL.EMPLOYEE + '/getEmployee', json, {headers: this.header});
    }

    getAllEmployee(json : any) {
        return this.http.post<BaseListResponse>(CommandURL.EMPLOYEE + '/getAllEmployee', json, {headers: this.header});
    }

    updateEmployee(json: any) {
        return this.http.post<BaseResponse>(CommandURL.EMPLOYEE + '/updateEmployee', json, {headers: this.header});
    }

    deleteEmployee(json: any) {
        return this.http.post<BaseResponse>(CommandURL.EMPLOYEE + '/deleteEmployee', json, {headers: this.header});
    }
}
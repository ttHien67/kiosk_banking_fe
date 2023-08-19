import { BaseResponse } from "./base-response.model";

export interface BaseListResponse extends BaseResponse {
    totalRecord: number,
    limit: number
}
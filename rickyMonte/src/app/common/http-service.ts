import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()

export class HttpService {
    constructor(private http:HttpClient) {

    }

    public getRequest(url:string) {
        return this.http.get(url);
    }
}
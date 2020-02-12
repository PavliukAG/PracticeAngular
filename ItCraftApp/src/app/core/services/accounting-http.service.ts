import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class AccountingHttpService {

  constructor(private http: HttpClient) { }
  readonly AccountingApiURL = '/Operation';

  getAccounting(id: number) {
    return this.http.get(`${BaseURL}${this.AccountingApiURL}/${id}`);
  }
  addAccounting(model) {
    return this.http.post(`${BaseURL}${this.AccountingApiURL}`, model);
  }

}

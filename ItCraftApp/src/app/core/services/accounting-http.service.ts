import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseURL } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class AccountingHttpService {

  constructor(private http: HttpClient) { }
  readonly AccountingApiURL = '/Operation';

  getAccounting(id: number, sortOption: number) {
    let params = new HttpParams().set("sortOrder", String(sortOption))
    return this.http.get<any>(`${BaseURL}${this.AccountingApiURL}/${id}`,  {params, observe:'response'});
  }
  addAccounting(model) {
    return this.http.post(`${BaseURL}${this.AccountingApiURL}`, model);
  }

}

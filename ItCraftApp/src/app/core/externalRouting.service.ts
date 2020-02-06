import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExternalRoutingService {

  constructor(private http: HttpClient) { }
  readonly BaseURL = 'http://localhost:54374/api';
  register(form) {
    let body = {
      userName: form.value.userName,
      email: form.value.email,
      fullName: form.value.fullName,
      password: form.value.passwords.password,

    };
    return this.http.post( this.BaseURL + '/Auth/Register', body);
  }
  login(formData){
    return this.http.post( this.BaseURL + '/Auth/Login', formData);
  }
}

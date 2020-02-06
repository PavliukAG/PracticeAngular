import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }
  readonly BaseURL = 'http://localhost:54374/api';

  getUserProfile(){
    return this.http.get(this.BaseURL + '/UserProfile');
  }
}

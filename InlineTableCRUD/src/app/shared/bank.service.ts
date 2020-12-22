import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  apiBaseURI = "http://localhost:51499/api";

  constructor(private http: HttpClient) { }

  getBankList(){
    return this.http.get(this.apiBaseURI + '/Bank');
  }
}

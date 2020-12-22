import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  apiBaseURI = "http://localhost:51499/api";

  constructor(private http: HttpClient) { }

  postBankAccount(formData){
    return this.http.post(this.apiBaseURI + "/BankAccount", formData)
  }

  putBankAccount(formData){
    return this.http.put(this.apiBaseURI + "/BankAccount/"+formData.bankAccountId, formData)
  }

  deleteBankAccount(id){
    return this.http.delete(this.apiBaseURI + "/BankAccount/" + id);
  }

  getBankAccountList(){
    return this.http.get(this.apiBaseURI + "/BankAccount");
  }


}

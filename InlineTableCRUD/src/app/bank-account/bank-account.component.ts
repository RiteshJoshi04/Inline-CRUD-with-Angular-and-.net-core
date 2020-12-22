import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AlertifyService } from '../shared/alertify.service';
import { BankAccountService } from '../shared/bank-account.service';
import { BankService } from '../shared/bank.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  bankAccountForms: FormArray = this.fb.array([]);
  bankList = [];
  notification = null;

  constructor(
      private fb: FormBuilder,
      private bankService: BankService,
      private service: BankAccountService,
      // private alertyfy: AlertifyService
      private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.bankService.getBankList().subscribe(res=>this.bankList = res as []);

    this.service.getBankAccountList().subscribe(
      res=>{
        if(res == []){
          this.addBankAccountForm();
        }
        else{
          //generate form array as per the data received from bank account table
          (res as []).forEach((bankAccount: any)=>{
            this.bankAccountForms.push(this.fb.group({
              bankAccountId: [bankAccount.bankAccountId],
              accountNumber: [bankAccount.accountNumber, Validators.required],
              accountHolder: [bankAccount.accountHolder, Validators.required],
              bankID: [bankAccount.bankId, Validators.min(1)],
              IFSC: [bankAccount.ifsc, Validators.required]
            }))
          })
        }
      }
    );
  }

  addBankAccountForm(){
    this.bankAccountForms.push(this.fb.group({
      bankAccountId: [0],
      accountNumber: ['', Validators.required],
      accountHolder: ['', Validators.required],
      bankID: [0, Validators.min(1)],
      IFSC: ['', Validators.required]
    }))
  }

  recordSubmit(fg: FormGroup){
    if(fg.value.bankAccountId==0){
      this.service.postBankAccount(fg.value).subscribe(
        (res: any)=> {
          fg.patchValue({bankAccountId: res.bankAccountId});
          this.showNotification('insert');
        }
      );
    }
    else{
      this.service.putBankAccount(fg.value).subscribe(
        (res: any)=> {
          this.showNotification('update');
        }
      );
    }
  }

  onDelete(bankAccountId, i){
    if(bankAccountId == 0){
      this.bankAccountForms.removeAt(i);
    }
    else if(confirm("are you sure to delete this record ?")){
      this.service.deleteBankAccount(bankAccountId).subscribe(
        res => {
          this.bankAccountForms.removeAt(i);
          this.showNotification('delete');
        }
      )
    }
  }

  // showNotification(category){
  //   switch (category) {
  //     case 'insert':
  //       this.notification = {class: 'text-success', message: 'saved!'}
  //       break;
  //     case 'udpate':
  //       this.notification = {class: 'text-primary', message: 'updated!'}
  //       break;
  //     case 'delete':
  //       this.notification = {class: 'text-danger', message: 'deleted!'}
  //       break;

  //     default:
  //       break;
  //   }
  // }

  showNotification(category){
    switch (category) {
      case 'insert':
        this.notification = this.toastr.success('Record successfully added');
        break;
      case 'udpate':
        this.notification = this.toastr.success('Record successfully updated');
        break;
      case 'delete':
        this.notification = this.toastr.error('Record successfully deleted');
        break;

      default:
        break;
    }
  }

}

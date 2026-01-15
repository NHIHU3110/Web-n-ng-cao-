import { Component } from '@angular/core';
import { CustomerService } from '../customer-service';

@Component({
  selector: 'app-listcustomer2',
  standalone: false,
  templateUrl: './listcustomer2.html',
  styleUrl: './listcustomer2.css',
})
export class Listcustomer2 {
 customers: any
 constructor(private cs: CustomerService){
  this.customers=cs.get_all_customer()
 }
}

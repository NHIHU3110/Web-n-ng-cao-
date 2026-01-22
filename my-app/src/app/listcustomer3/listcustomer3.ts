import { Component } from '@angular/core';
import { CustomerService } from '../customer-service';

@Component({
  selector: 'app-listcustomer3',
  standalone: false,
  templateUrl: './listcustomer3.html',
  styleUrls: ['./listcustomer3.css'],
})
export class Listcustomer3 {
  customer: any[] = [];
  arr_ages: number[] = [];

  constructor(private cs: CustomerService) {
    for (let i = 20; i <= 100; i++) {
      this.arr_ages.push(i);
    }

    this.do_filter(20, 100);
  }

  do_filter(fromAge: any, toAge: any) {
    this.customer = this.cs.filter_customer_by_age(+fromAge, +toAge);
  }
}

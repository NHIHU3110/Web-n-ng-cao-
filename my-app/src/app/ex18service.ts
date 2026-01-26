import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerGroup } from './ex18-customer/customer-group';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Ex18service {
  constructor(private http: HttpClient) { }

  getGroups(): Observable<CustomerGroup[]> {
    const url = '/assets/data/customer-groups.json?t=' + new Date().getTime();
    return this.http.get<CustomerGroup[]>(url);
  }

}

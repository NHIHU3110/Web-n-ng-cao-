import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerGroup } from '../ex18-customer/customer-group';
import { Ex18service } from '../ex18service';

@Component({
  selector: 'app-ex18',
  standalone: false,
  templateUrl: './ex18.html',
  styleUrl: './ex18.css',
})
export class Ex18 implements OnInit {
  data: CustomerGroup[] = [];
  errMessage: string = '';

  constructor(private sv: Ex18service, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('Ex18: Loading data...');
    this.sv.getGroups().subscribe({
      next: (res) => {
        console.log('Ex18: Data received', res);
        this.data = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Ex18: Error loading data', err);
        this.errMessage = `Error: ${err.status} - ${err.message || String(err)}`;
        this.cdr.detectChanges();
      },
    });
  }
}
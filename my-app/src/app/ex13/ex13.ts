import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Productservice } from '../productservice';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-ex13',
  templateUrl: './ex13.html',
  styleUrls: ['./ex13.css'],
  standalone: false,
})
export class Ex13 {
  products: any[] = [];
  showTable: boolean = true;

  constructor(
    private pservice: Productservice,
    private router: Router
  ) {
    this.products = this.pservice.getProductsWithImages();

    // Check initial url
    this.checkRoute(this.router.url);

    // Subscribe to router events to toggle visibility based on URL
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkRoute(event.url);
    });
  }

  checkRoute(url: string) {
    // If URL contains '/ex13/', it means we are in detail view
    if (url.includes('/ex13/')) {
      this.showTable = false;
    } else {
      this.showTable = true;
    }
  }

  viewDetail(p: any) {
    console.log(p);
    this.router.navigate(['/ex13', p.ProductId]).catch(err => {
      console.error('Navigation error:', err);
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Productservice } from '../productservice';

@Component({
  selector: 'app-ex13',
  templateUrl: './ex13.html',
  styleUrls: ['./ex13.css'],
  standalone: false,
})
export class Ex13 {
  products: any[] = [];

  constructor(
    private pservice: Productservice,
    private router: Router
  ) {
    this.products = this.pservice.getProductsWithImages();
  }

  viewDetail(p: any) {
    console.log(p);
    this.router.navigate(['ex13', p.ProductId]);
  }
}

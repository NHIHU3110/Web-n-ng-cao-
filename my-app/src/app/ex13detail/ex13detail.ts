import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Productservice } from '../productservice';

@Component({
  selector: 'app-ex13detail',
  templateUrl: './ex13detail.html',
  styleUrls: ['./ex13detail.css'],
  standalone: false,
})
export class Ex13detail {
  selectedProduct: any;

  constructor(
    private route: ActivatedRoute,
    private pservice: Productservice,
    private router: Router
  ) {
    this.route.paramMap.subscribe(param => {
      const id = param.get('id');
      if (id) {
        this.selectedProduct = this.pservice.getProductDetail(id);
      }
    });
  }

  goBack() {
    this.router.navigate(['ex13']);
  }
}

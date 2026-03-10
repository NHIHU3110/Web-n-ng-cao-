import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FashionApiService } from '../myservices/fashion-api.service';
import { CartService } from '../myservices/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fashion',
  templateUrl: './fashion.html',
  styleUrls: ['./fashion.css'],
  standalone: false
})
export class FashionComponent implements OnInit {
  fashions: any[] = [];
  errMessage: string = '';

  constructor(
    public _service: FashionApiService,
    private _cartService: CartService,
    private _router: Router,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadFashions();
  }

  loadFashions() {
    this._service.getFashions().subscribe({
      next: (data) => {
        this.fashions = data;
        this._cdr.detectChanges(); // Force refresh to ensure data shows immediately
      },
      error: (err) => { this.errMessage = err }
    });
  }

  viewDetail(id: string) {
    if (id && id.trim() !== '') {
      this._router.navigate(['/fashions', id.trim()]);
    }
  }

  addToCart(fashion: any, event: Event) {
    event.stopPropagation();
    this._cartService.addToCart(fashion).subscribe({
      next: (res) => alert("Added to cart successfully!"),
      error: (err) => alert("Failed to add to cart.")
    });
  }
}

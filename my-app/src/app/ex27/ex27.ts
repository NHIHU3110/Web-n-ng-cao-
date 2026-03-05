import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FakeProductService } from '../myservices/fake-product-service';

@Component({
  selector: 'app-ex27',
  standalone: false,
  templateUrl: './ex27.html',
  styleUrl: './ex27.css',
})
export class Ex27 implements OnInit {
  data: any
  errMessage: string = ''

  constructor(private _service: FakeProductService, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this._service.getFakeProductData().subscribe({
      next: (data) => {
        this.data = data;
        this._cdr.detectChanges();
      },
      error: (err) => {
        this.errMessage = err;
        this._cdr.detectChanges();
      }
    });
  }
}

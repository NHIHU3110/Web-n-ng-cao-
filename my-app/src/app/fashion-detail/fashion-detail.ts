import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FashionApiService } from '../myservices/fashion-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fashion-detail',
  standalone: false,
  templateUrl: './fashion-detail.html',
  styleUrl: './fashion-detail.css',
})
export class FashionDetail implements OnInit {
  fashion: any = null;
  errMessage: string = '';
  isSearching: boolean = false;

  constructor(
    private _service: FashionApiService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe(
      (param) => {
        let id = param.get('id');
        if (id) {
          this.isSearching = true;
          this.getFashion(id);
        } else {
          this.isSearching = false;
        }
      }
    );
  }

  getFashion(id: string) {
    if (!id || id.trim() === '') {
      this.errMessage = "Please enter a valid Fashion ID.";
      return;
    }

    this.isSearching = true;
    this.errMessage = '';
    this.fashion = null; // clear previous state

    this._service.getFashion(id).subscribe({
      next: (data) => {
        this.fashion = data;
        this.isSearching = false;
        this._cdr.detectChanges(); // Ensure UI reflects data immediately
      },
      error: (err) => {
        this.errMessage = "Could not find fashion with this ID. Please check and try again.";
        this.isSearching = false;
        this._cdr.detectChanges();
      }
    });
  }

  goBack() {
    this._router.navigate(['/fashions']);
  }

  buyOnMomo() {
    if (this.fashion) {
      localStorage.setItem('PENDING_ORDER', JSON.stringify(this.fashion));
      this._router.navigate(['/checkout']);
    }
  }
}

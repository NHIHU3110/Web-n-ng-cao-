import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BookAPIservice } from '../myservices/book-apiservice';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books implements OnInit {
  books: any;
  errMessage: string = ''
  constructor(private _service: BookAPIservice, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this._service.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this._cdr.detectChanges();
      },
      error: (err) => {
        this.errMessage = err;
        this._cdr.detectChanges();
      }
    })
  }
}

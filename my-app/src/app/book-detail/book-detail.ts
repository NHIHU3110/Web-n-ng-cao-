import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAPIservice } from '../myservices/book-apiservice';

@Component({
  selector: 'app-book-detail',
  standalone: false,
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail implements OnInit {
  book: any;
  errMessage: string = '';

  constructor(private _route: ActivatedRoute, private _router: Router, private _service: BookAPIservice) { }

  ngOnInit() {
    console.log('ngOnInit được gọi!');
    this._route.params.subscribe(params => {
      let id = params['id'];
      console.log('ID nhận được từ URL:', id);
      if (id) {
        this.searchBook(id);
      }
    });
  }

  searchBook(bookId: string) {
    console.log('searchBook được gọi với ID:', bookId);
    this._service.getBookDetails(bookId).subscribe({
      next: (data: any) => {
        console.log('Dữ liệu nhận được từ API:', data);
        this.book = data;
      },
      error: (err: any) => {
        console.log('Lỗi khi gọi API:', err);
        this.errMessage = err;
      }
    });
  }

  deleteBook() {
    if (confirm("Are you sure you want to delete this book?")) {
      this._service.deleteBook(this.book.BookId).subscribe({
        next: (data) => {
          alert("Book deleted successfully!");
          this._router.navigate(['/ex39']);
        },
        error: (err) => { this.errMessage = "Delete Error: " + err.message }
      })
    }
  }
}

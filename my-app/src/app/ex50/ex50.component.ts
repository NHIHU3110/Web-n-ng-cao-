import { Component, OnInit } from '@angular/core';
import { BookAPIservice } from '../myservices/book-apiservice';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ex50',
    standalone: false,
    templateUrl: './ex50.component.html',
    styleUrls: ['./ex50.component.css']
})
export class Ex50Component implements OnInit {
    books: any;
    errMessage: string = '';

    constructor(private _service: BookAPIservice, private _router: Router) { }

    ngOnInit() {
        this.loadBooks();
    }

    loadBooks() {
        this._service.getBooks().subscribe({
            next: (data) => { this.books = data },
            error: (err) => { this.errMessage = err }
        })
    }

    deleteBook(bookId: string) {
        if (confirm("Are you sure you want to delete this book?")) {
            this._service.deleteBook(bookId).subscribe({
                next: (data) => {
                    this.books = data;
                    alert("Book deleted successfully!");
                },
                error: (err) => { this.errMessage = "Delete Error: " + err.message }
            })
        }
    }

    viewDetail(bookId: string) {
        this._router.navigate(['/ex41', bookId]);
    }

    editBook(bookId: string) {
        this._router.navigate(['/ex43', bookId]);
    }

    createBook() {
        this._router.navigate(['/ex43']);
    }
}

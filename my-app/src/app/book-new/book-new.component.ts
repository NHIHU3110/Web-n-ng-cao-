import { Component, OnInit } from '@angular/core';
import { BookAPIservice } from '../myservices/book-apiservice';
import { Book } from '../myclass/book';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-book-new',
    standalone: false,
    templateUrl: './book-new.component.html',
    styleUrls: ['./book-new.component.css']
})
export class BookNewComponent implements OnInit {
    book = new Book();
    books: any;
    errMessage: string = '';
    isUploading: boolean = false;
    isEditMode: boolean = false;

    constructor(
        private _service: BookAPIservice,
        private http: HttpClient,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.loadBooks();
        this._route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.isEditMode = true;
                this._service.getBookDetails(id).subscribe({
                    next: (data) => { this.book = data; },
                    error: (err) => { this.errMessage = err; }
                });
            }
        });
    }

    loadBooks() {
        this._service.getBooks().subscribe({
            next: (data) => { this.books = data },
            error: (err) => { this.errMessage = err }
        })
    }

    postBook() {
        if (this.isEditMode) {
            this._service.putBook(this.book).subscribe({
                next: (data) => {
                    this.books = data;
                    alert("Book updated successfully!");
                    this._router.navigate(['/ex39']);
                },
                error: (err) => { this.errMessage = "Update Error: " + err.message }
            });
        } else {
            this._service.postBook(this.book).subscribe({
                next: (data) => {
                    this.books = data;
                    this.book = new Book(); // Reset form
                    alert("Book created successfully!");
                    this._router.navigate(['/ex39']);
                },
                error: (err) => { this.errMessage = "Post Error: " + err.message }
            });
        }
    }

    deleteBook() {
        if (confirm("Are you sure you want to delete this book?")) {
            this._service.deleteBook(this.book.BookId).subscribe({
                next: (data) => {
                    this.books = data;
                    alert("Book deleted successfully!");
                    this._router.navigate(['/ex39']);
                },
                error: (err) => { this.errMessage = "Delete Error: " + err.message }
            })
        }
    }

    onPickImage(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.isUploading = true;
            const formData = new FormData();
            formData.append("image", file);

            // Automatically upload to port 3001
            this.http.post<any>("http://localhost:3001/upload", formData).subscribe({
                next: (res) => {
                    this.book.Image = file.name;
                    this.isUploading = false;
                },
                error: (err) => {
                    console.error("Image Upload Error:", err);
                    alert("Could not upload image to Server 3001. Please make sure the server is running.");
                    this.book.Image = file.name; // Fallback to name anyway
                    this.isUploading = false;
                }
            });
        }
    }
}

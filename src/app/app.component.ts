import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { generateMongoObjectId } from './core/utils/mongoIdGenerator';
import { Book } from './models/book.model';
import { BooksService } from './services/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  books: Book[] = [];
  bookUpdate: Book | undefined;
  updatingBook = false;

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.getAllBooks();
  }

  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
  });

  isInvalidTitle() {
    return (
      this.bookForm.get('title')?.invalid && this.bookForm.get('title')?.touched
    );
  }

  isInvalidAuthor() {
    return (
      this.bookForm.get('author')?.invalid &&
      this.bookForm.get('author')?.touched
    );
  }

  getAllBooks() {
    this.booksService.getAllBooks().subscribe((books) => {
      this.books = books;
    });
  }


  createBook() {
    this.bookForm.markAllAsTouched();
    if (this.bookForm.valid) {
      const newBook: Book = {
        id: generateMongoObjectId(),
        title: this.bookForm.get('title')?.value,
        author: this.bookForm.get('author')?.value,
      };

      this.booksService.createBook(newBook).subscribe((book) => {
        this.getAllBooks();
        this.bookForm.reset();
      });
    }
  }

  activeEditBook(book: Book){
    this.bookUpdate = book;
    this.updatingBook = true;
    this.bookForm.patchValue(book);
  }

  editBook() {
    this.bookForm.markAllAsTouched();
    if (this.bookForm.valid) {
      const newBook: Book = {
        id: this.bookUpdate?.id || '',
        title: this.bookForm.get('title')?.value,
        author: this.bookForm.get('author')?.value,
      };

      this.booksService.updateBook(newBook).subscribe((books) => {
        this.getAllBooks();
        this.bookForm.reset();
        this.updatingBook = false;
      });
    }
  }

  cancelUpdate(){
    this.updatingBook = false;
    this.bookForm.reset();
  }

  deleteBook(book: Book) {
    this.booksService.deleteBook(book.id).subscribe((book) => {
      this.getAllBooks();
    });
  }
}

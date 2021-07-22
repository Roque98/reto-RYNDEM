import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  url = "http://localhost:8080/api"

  constructor(
    private http: HttpClient
  ) { }

  getAllBooks(){
    return this.http.get<Book[]>(`${this.url}/getAllBooks`)
  }

  
  createBook(book: Book){
    return this.http.post<Book>(`${this.url}/createBook`, book)
  }

  updateBook(book: Book){
    return this.http.put<Book[]>(`${this.url}/updateBook`, book);
  }

  deleteBook(id: string){
    return this.http.delete(`${this.url}/deleteBook/${id}`);
  }
}

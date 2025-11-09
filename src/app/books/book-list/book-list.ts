import { Component, inject, Input, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookApiClient } from '../book-api-client.service';
import { FormsModule } from '@angular/forms';
import { BookItem } from '../book-item/book-item';

@Component({
  selector: 'app-book-list',
  imports: [
    FormsModule,
    BookItem
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
  standalone: true
})
export class BookList implements OnInit {
  @Input() pageSize = 10;
  books: Book[] = [];
  loading = true;
  searchTerm = '';
  searchTimeout: any;

  private bookApiClient = inject(BookApiClient);

  ngOnInit(): void {
    this.loadBooks();
  }

private loadBooks(search?: string): void {
    this.loading = true;
    this.bookApiClient.getBooks(this.pageSize, search).subscribe({
      next: books => {
        this.books = books;
        this.loading = false;
      },
      error: error => {
        console.error('Error fetching books:', error);
        this.loading = false;
      }
    });
  }

  onSearchChange(): void {
    clearTimeout(this.searchTimeout);
  this.searchTimeout = setTimeout(() => {
    this.loadBooks(this.searchTerm);
  }, 300);
}

  clearSearch(): void {
    this.searchTerm = '';
    this.loadBooks();
  }

  trackById(index: number, book: Book): string {
    return book.id;
  }

  printAuthor(author: string) {
    console.log('Author clicked: ' + author)
  }
}

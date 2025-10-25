import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common'; // Nötig für @if/@else

import { Book } from '../book';
import { BookApiClient } from '../book-api-client.service';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, startWith } from 'rxjs/operators';

// Definiert, wie unser lokaler State aussieht
interface BookDetailState {
  book?: Book;
  loading: boolean;
  error?: string;
}

@Component({
  selector: 'app-book-detail',
  standalone: true,

  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.css'],

  imports: [CommonModule, RouterModule],
})
export class BookDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookApiClient = inject(BookApiClient);

  book: Book | null = null;
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      this.error = 'Book ID not found';
      return;
    }

    this.bookApiClient.getBookById(id).subscribe({
      next: book => {
        this.book = book;
        this.loading = false;
      },
      error: err => {
        console.error('Error fetching book details:', err);
        this.loading = false;
        this.error = 'Could not load book details. The book may not exist.';
      }
    });
  }


  goBack(): void {
    this.router.navigate(['/']);
  }
}

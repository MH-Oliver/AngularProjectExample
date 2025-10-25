import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastService } from '../../shared/toast.service';
import { Book } from '../book';
import { BookApiClient } from '../book-api-client.service';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatSnackBarModule],
  // Verweise auf die externen Template- und CSS-Dateien
  templateUrl: './book-edit.html',
  styleUrls: ['./book-edit.css']
})
export class BookEdit implements OnInit {
  book: Book | null = null;
  loading = true;
  saving = false;
  error: string | null = null;

  @ViewChild('bookForm') bookForm!: NgForm;


  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookApiClient = inject(BookApiClient);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      this.error = 'Book ID not found';
      return;
    }

    this.bookApiClient.getBookById(id).subscribe({
      next: book => {
        this.book = { ...book }; // Create a copy to avoid direct mutation
        this.loading = false;
      },
      error: err => {
        console.error('Error fetching book:', err);
        this.loading = false;
        this.error = 'Could not load book details. The book may not exist.';
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid || !this.book) {
      return;
    }

    this.saving = true;
    this.bookApiClient.updateBook(this.book).subscribe({
      next: () => {
        this.saving = false;
        this.toastService.show('Book updated successfully!');
      },
      error: err => {
        console.error('Error updating book:', err);
        this.saving = false;
        this.toastService.show('Error updating book. Please try again.', 5000);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/books', this.book?.id || '']);
  }
}

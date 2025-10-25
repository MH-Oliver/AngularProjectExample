import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Book } from '../book';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  // Verweis auf die externen Dateien
  templateUrl: './book-item.html',
  styleUrls: ['./book-item.css']
})
export class BookItem {
  @Input() book!: Book;
}

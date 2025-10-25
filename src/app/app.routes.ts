import { Routes } from '@angular/router';


import { BookDetail } from './books/book-detail/book-detail';
import { BookList } from './books/book-list/book-list';
import { BookEdit } from './books/book-edit/book-edit';

export const routes: Routes = [
  { path: '', component: BookList },
  { path: 'books/:id', component: BookDetail },
  { path: 'books/:id/edit', component: BookEdit },
  { path: '**', redirectTo: '' }
];

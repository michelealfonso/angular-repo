import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Books, ReadingLogResponse } from '../models/books';
import { AnyAaaaRecord } from 'node:dns';


@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService  {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Books[]> {
    return this.http.get<ReadingLogResponse>(
      'https://openlibrary.org/people/mekBot/books/want-to-read.json'
    )
    .pipe(
      tap((response) => console.log('Response from Google Books API:', response)),
      map((response) => response.reading_log_entries.map((entry) => ({
        id: Number(entry.work.key),
        title: entry.work.title,
        authors: entry.work.author_names,
        coverId: entry.work.cover_id,
        firstPublishYear: entry.work.first_publish_year,
        loggedDate: entry.logged_date
      }))),
    )
  }
}

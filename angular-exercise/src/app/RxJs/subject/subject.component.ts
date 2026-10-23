import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  Subject,
  of,
  from,
  share,
  scan,
  BehaviorSubject,
 } from 'rxjs';

@Component({
  selector: 'app-subject',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css',
})
export class SubjectComponent implements OnInit, OnDestroy {

  // creiamo un subject con un array di numeri
  numbers = [1, 2, 3, 4, 5];
  arrayForMulticast = [1, 2, 3, 4, 5];
  subject = new Subject<number[]>();

  subject$ = this.subject.asObservable();

  // creiamo un subject tramite multicast

  source = from(this.arrayForMulticast).pipe(share());

  // creiamo un observer per accumulare e vedere i valori emessi dal multicast

  multicasted = this.source.pipe(
    scan((acc, value) => [...acc, value], [] as number[])
  )

  // vediamo un esempio con bahavior subject

  subjectBahavior = new BehaviorSubject<string>('Michele');

  ngOnInit(): void {
    console.log('abbiamo fatto accesso ad ngOnInit del subject');
    this.subject$.subscribe({
      next: (newSubject) =>
        console.log('observerA', JSON.stringify(newSubject)),
      error: (error) => console.log('observerA error', error),
      complete: () => console.log('observerA complete')
    });

    setTimeout(() => {
      this.subject.next(this.numbers);
    }, 2000);

    // procediamo con l'iscrizione al multicast

    this.source.subscribe({
      next: (multicasted) => console.log('observerMulticasted',  JSON.stringify(multicasted))
    });

    setTimeout(() => {
      this.subject.next(this.arrayForMulticast);
    }, 2000);

    // vediamo un esempio con bahavior subject

    console.log(`facciamo l'iscrizione a behavior subject`);

    this.subjectBahavior.subscribe({
      next: (value) => console.log('observerBahavior', value),
    });

    this.subjectBahavior.next('Antonio')

    setTimeout(() => {
       this.subjectBahavior.subscribe({
      next: (value) => console.log('observerBahavior', value),
    })
    }, 5000);

  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
}



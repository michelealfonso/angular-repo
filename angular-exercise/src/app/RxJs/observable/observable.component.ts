// ✅ Questo componente dimostra:
// - come creare un Observable RxJS
// - come usare subscribe con next, error, complete
// - come salvare e chiudere la subscription manualmente
// - come applicare le best practice Angular (ngOnInit + ngOnDestroy)

import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrl: './observable.component.css',
  imports: [AsyncPipe],
})
export class ObservableComponent implements OnInit, OnDestroy {
  observable = new Observable((subscriber) => {
    subscriber.next('Hello RxJs,');

    setTimeout(() => {
      subscriber.next(`i'm Michele`);
      subscriber.complete();
    }, 1000);
  });

  subscription!: Subscription;

  ngOnInit() {
    console.log('Questo è quello che ottengo dalla sottoscrizione:');
    this.subscription = this.observable.subscribe({
      next(name) {
        console.log('message: ', name);
      },
      error(error) {
        console.log('error: ', error);
      },
      complete() {
        console.log('done');
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('Unsubscribed');
  }
}

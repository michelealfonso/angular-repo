import { Component, OnInit } from '@angular/core';
import { asyncScheduler, observeOn, Observable } from 'rxjs';

@Component({
  selector: 'app-scheduler',
  imports: [],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.css'
})
export class SchedulerComponent implements OnInit {

  observable = new Observable((observer) => {
    observer.next(1),
    observer.next(2),
    observer.next(3),
    observer.complete()
  }).pipe(
    observeOn(asyncScheduler)
  )

  ngOnInit(): void {
      console.log(`faccio l'iscrizione allo scheduler`);

      this.observable.subscribe({
        next(value) {
          console.log('valore dello scheduler', value)
        },
        error(error) {
          console.error('errore nello scheduler', error)
        },
        complete() {
          console.log('completato lo scheduler')
        }
      })
  }
}

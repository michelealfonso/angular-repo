import { Component, OnInit,  } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-observer',
  imports: [
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './observer.component.html',
  styleUrl: './observer.component.css'
})
export class ObserverComponent implements OnInit {


  observable = new Observable<{name: string, age: number}>(subscriber => {
    subscriber.next({
      name: 'Michele',
      age: 27,
    });
    subscriber.complete();
  });


  observer: Observer<{name: string, age: number}> = {
    next: x => console.log('Observer got a next value: ', JSON.stringify(x)),
    error: error => console.error('Observer got an error:' + error),
    complete: () => console.log('done'),
  }

  ngOnInit() {
    this.observable.subscribe(this.observer)
  }
}

import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { of, delay, map, concat } from 'rxjs';
import { concatAll, concatMap } from 'rxjs/operators';


@Component({
  selector: 'app-higher-order-observables',
  imports: [
    AsyncPipe
  ],
  templateUrl: './higher-order-observables.component.html',
  styleUrl: './higher-order-observables.component.css',
})


export class HigherOrderObservable implements OnInit {

  urlObservable$ = of('url1', 'url2', 'url3');

  fakehHttRequest(url: string) {
    return of('request response ' + url).pipe(delay(2000));
  }

  fileObservable$ = this.urlObservable$.pipe(
    // concatMap(url => this.fakehHttRequest(url)),
    map(url => this.fakehHttRequest(url)),
    concatAll()
  )

  ngOnInit(): void {
    this.fileObservable$.subscribe({
      next(response) {
        console.log(response)
      },
      error(error) {
        console.log('error:', error)
      },
      complete() {
        console.log('done')
      }
    })
  }
}

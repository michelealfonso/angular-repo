import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, map, filter, merge, mergeMap, toArray } from 'rxjs';
import { AsyncPipe, JsonPipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-operators',
  imports: [
    AsyncPipe,
    // JsonPipe,
    NgIf,
    NgClass
  ],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.css',
})
export class OperatorsComponent implements OnInit, OnDestroy {
  objectCollection = [
    {
      id: 1,
      name: 'Michele',
    },
    {
      id: 2,
      name: 'Antonio',
    },
    {
      id: 3,
      name: 'Stefania',
    },
    {
      id: 4,
      name: 'Achille',
    },
  ];

  object$ = of(this.objectCollection);
  filteredObjects$ = this.object$.pipe(map(objects => objects.filter(objectById => objectById.id % 2 === 0)))

    evenNumbers$ = of(2, 4, 6);
    oddNumbers$ = of(1, 3, 5);

    unionObservable$ = merge(this.evenNumbers$, this.oddNumbers$).pipe(
      toArray(),
      mergeMap(numbers => of(numbers.sort((a, b) => a - b))),
      map(mappingNumbers => mappingNumbers.filter(filterNumbers => filterNumbers % 2 === 1))
    )

  ngOnInit() {
        this.filteredObjects$.subscribe(filteredObjects => console.log('New array', filteredObjects));
        this.unionObservable$.subscribe(filtreds => console.log('filtered numbers:', filtreds))
  }

  ngOnDestroy() {}
}

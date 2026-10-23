import { NgStyle, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCount } from '../../NgRx/counter/counter.selector';
import { increment, decrement, reset } from '../../NgRx/counter/counter.actions';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-count',
  imports: [
    NgStyle,
    AsyncPipe
  ],
  templateUrl: './count.component.html',
  styleUrl: './count.component.css',
})
export class CountComponent implements OnInit{
  // esempio di gestione di stato del count

  ngOnInit(): void {
      this.count$.subscribe(count => {
        console.log(count)
      })
  }

  count: number = 0;
  changeColorStyle: Record<string, string> = {};

  handleIncrement() {
    this.count++;
    this.changeColor();
  }

  handleDecrement() {
    this.count--;
    this.changeColor();
  }

  handleReset() {
    this.count = 0;
    this.changeColor()
  }

  changeColor() {
    this.changeColorStyle = {
      color: this.count < 0 ? 'red' : 'black',
    };
  }

  // logica scritta con ngRx

  count$: Observable<number>;



  constructor(private store: Store) {
    this.count$ = this.store.select(selectCount);
  }

  handleIncrementNgRx() {
    this.store.dispatch(increment());
  }

  handleDecrementNgRx() {
    this.store.dispatch(decrement());
  }

  handleResetNgRx() {
    this.store.dispatch(reset());
  }

  getColorStyle(count: number | null): Record<string, string> {
  return {
    color: (count !== null && count < 0) ? 'red' : 'black',
  };
  }
}

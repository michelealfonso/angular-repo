import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

export const selectCounter = createFeatureSelector<CounterState>('counter');

export const selectCount = createSelector(
  selectCounter,
  (state) => state.count
);

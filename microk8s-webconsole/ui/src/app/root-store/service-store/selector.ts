import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {State} from './state';

const getError = (state: State): any => state.error;
const getServices = (state: State): any => state.services;

export const selectServiceState: MemoizedSelector<object, State> = createFeatureSelector<State>('services');
export const selectServiceError: MemoizedSelector<object, any> = createSelector(selectServiceState, getError);
export const selectServices: MemoizedSelector<object, any> = createSelector(selectServiceState, getServices);

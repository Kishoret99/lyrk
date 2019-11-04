import { BehaviorSubject } from "rxjs";
import { pluck, map, distinctUntilChanged } from "rxjs/operators";
import { InjectionToken } from '@angular/core';

export interface AppState {
    currentlyPlaying: string
}

export class Store {
  private state: BehaviorSubject<AppState>;
  private reducer;

  constructor(reducer, initialState: AppState) {
    this.state = new BehaviorSubject(initialState);
    this.reducer = reducer;
  }

  /**
   * Dispatch the given action to alter the current state
   * @param action Action object to be proceesed by the reducers
   */
  dispatch(action) {
    this.state.next(this.reducer(this.getState(), action));
  }

  /**
   * Creates a new observable that will be calles on every state change filtered with the given selector
   * @param ...object | function One function to map the current state obserbable or a list of object to pluck into the state observable
   */
  select(...selectors) {
    if(selectors && selectors.length === 1 && typeof selectors[0] === 'function') {
      return this.state.pipe(map(selectors[0]), distinctUntilChanged());
    } else {
      return this.state.pipe(pluck(...selectors), distinctUntilChanged());
    }
  }

  /**
   * Returns the current state of the store
   */
  getState() {
    return this.state.value;
  }

  /**
   * Subscribe to changes in the store
   * @param subcriber Function to be called on each new value or object with next, error and complete functions.
   * @example:
   * {
      next: x => console.log('got value ' + x),
      error: err => console.error('something wrong occurred: ' + err),
      complete: () => console.log('done'),
    }
   */
  subscribe(subcriber) {
    return this.state.subscribe(subcriber);
  }
}


export function createStore(reducer, initialState, enhancer) {
  let store = new Store(reducer, initialState);
  store = enhancer ? enhancer(() => store)(reducer, initialState) : store;
  store.dispatch({type: '@@store INIT'});
  return store;
}


export interface Action {
  type: string;
  payload?: any
}

export const APP_STATE = new InjectionToken('APP_STATE')
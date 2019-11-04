import {
  createStore,
  combineReducers,
  applyMiddlewares,
  APP_STATE
} from './store/core';

import {
  devToolsMiddleware,
  loggerMiddleware,
  effectsMiddleware,
  storageMiddleware,
  SAVED_APP_STATE,
  ACTIONS,
  routerMiddleware,
  actions$
} from './store/core/middlewares';

import { reducers } from './store/reducer';
import { Provider } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { EffectsService } from './store/reducer';


export function createStoreFactory(
  storage: Storage,
  savedState,
  router: Router,
  effectsService: EffectsService
  ) {
  const initialState =  savedState ||  {
    todos: []
  };

  const store =  createStore(
    combineReducers(reducers),
    initialState,
    applyMiddlewares(
      routerMiddleware(router, true),
      storageMiddleware(storage),
      loggerMiddleware,
      devToolsMiddleware({}),
      effectsMiddleware(...effectsService.getEffects()))
    );
  return store;
}

export const appStateProvider: Provider = {
  provide: APP_STATE,
  useFactory: createStoreFactory,
  deps: [
    Storage,
    SAVED_APP_STATE,
    Router,
    EffectsService
  ]
};

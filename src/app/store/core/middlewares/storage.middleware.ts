import { Storage } from '@ionic/storage';
import { InjectionToken } from '@angular/core';
export const APP_STATE_KEY = 'APP_STATE_KEY';

export const storageMiddleware = (storage: Storage) => store => next => action => {
    next(action);
    storage.set(APP_STATE_KEY, store.getState());
}

export const getStateFromStorage = async (storage: Storage) => {
    const state = await storage.get(APP_STATE_KEY);
    return {...state, router: null};
}

export const SAVED_APP_STATE = new InjectionToken('SAVED_APP_STATE');
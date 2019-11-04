import { filter } from 'rxjs/operators';
import { Subject, merge } from 'rxjs';
import { Action } from '../store';
import { InjectionToken } from '@angular/core';

export function ofType(...types) {
  return filter((action: Action) => {
    return types.includes(action.type);
  });
}

export const ACTIONS = new InjectionToken('ACTIONS');
export const actions$ = new Subject();

export const effectsMiddleware = (...effects) => {
  return store => {
    return next => {
      merge(...getActionsFromEffects(effects)).subscribe(action => {
        if (!action) {
          return;
        }
        setTimeout(() => {
          store.dispatch(action);
        }, 0);
      });
      return action => {
        next(action);
        actions$.next(action);
      };
    };
  };
};

function getActionsFromEffects(effects) {
  return effects.reduce((cum, curr) => {
    Object.keys(curr)
      .map(key => curr[key])
      .filter(action$ => action$.type && action$.type === 'effect')
      .forEach(action$ => cum.push(action$.subject));
    return cum;
  }, []);
}

export const Effect = config => (target) => {
  return {
    ...config,
    subject: target,
    type: 'effect'
  };
};

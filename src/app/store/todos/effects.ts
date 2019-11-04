import { Effect, actions$, ofType } from '../core/middlewares';
import * as TODO_ACTIONS from './constants';
import * as TODO_ACTIONS_CREATORS from './actions';
import { mergeMap, map } from 'rxjs/operators';
import { timer } from 'rxjs';

class ToDoService {
    getToDos() {
        return timer(2000).pipe(map(() => TODO_ACTIONS_CREATORS.addToDoAction('async')))
    }
}

class ToDoEffects {
    toDoAsync: any;
    constructor(_toDoService, _actions$) {
        this.toDoAsync = Effect({})(
            _actions$
              .pipe(ofType(TODO_ACTIONS.ADD_TODO_ASYNC))
              .pipe(mergeMap(() => _toDoService.getToDos()))
          );
    }
}

export const toDoEffects = new ToDoEffects(new ToDoService(), actions$)

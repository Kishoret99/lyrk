import * as TODO_ACTIONS from './constants';
import { Action } from '../core/store';

export function addToDoAction(todo) {
    return {
        type: TODO_ACTIONS.ADD_TODO,
        payload: todo
    }
}

export function addToDoAsyncAction() {
    return {
        type: TODO_ACTIONS.ADD_TODO_ASYNC
    }
}
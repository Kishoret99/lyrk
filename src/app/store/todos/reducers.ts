import * as TODO_ACTIONS from './constants';
import { Action } from '../core/store';

export function reducer(state: Array<string> = [], action: Action) {
    switch (action.type) {
        case TODO_ACTIONS.ADD_TODO:
            return [...state, action.payload];
        default:
            return state;
    }
}
import * as BANNER_ACTIONS from './constants';
import { Action } from '../core/store';

export function reducer(state, action: Action) {
    switch (action.type) {
        case BANNER_ACTIONS.GET_BANNERS_REQUEST:
            return {...state, status: 'REQUEST', data: [], error: null};
        case BANNER_ACTIONS.GET_BANNERS_SUCCESS:
            return {...state, status: 'SUCCESS', data: action.payload, error: null};
        case BANNER_ACTIONS.GET_BANNERS_FAILURE:
            return {...state, status: 'FAILURE', data: [], error: action.payload};
        default:
            return state;
    }
}
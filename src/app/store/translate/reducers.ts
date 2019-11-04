import * as TRANSLATE_ACTIONS from './constants';

export function reducer(state = 'en', action) {
    switch (action.type) {
        case TRANSLATE_ACTIONS.SWITCH_LANGUAGE:
            return action.payload;
        default:
            return state;
    }
}

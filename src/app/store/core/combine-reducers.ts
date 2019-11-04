import { AppState } from './store';

export function combineReducers(reducers) {
    
    return (state: AppState, action): AppState => {

        return Object.keys(reducers).reduce((acc, curr) => {
            return {
                ...acc,
                [curr]: reducers[curr](state[curr], action) || undefined
            }
        }, state)
    }
}
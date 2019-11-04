/**
 * this middleware is inspired from ngxs router middleware and connected react router
 * it is a mixture of the ngxs angular concepts and conected react router's simplicity
 * at present it only handles basic navigation and is not yet resillient
 * reference links:
 * https://github.com/ngxs/store/tree/master/packages/router-plugin/src
 * https://github.com/supasate/connected-react-router/blob/master/src/ConnectedRouter.js
 */


import { Router, NavigationEnd } from '@angular/router';
import { Store } from '../store';
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export const routerMiddleware = (router: Router, initial = false, inTimeTravelling = false) => (store: Store) => next => action => {
    if (initial) {
        initial = false;
        store.subscribe((state) => {
            if (state && state.router && state.router.location && window.location) {
                const {pathname: statePathName, search: stateSearch, hash: stateHash} = state.router.location;
                const {pathname: windowPathName, search: windowSearch, hash: windowHash} = window.location;
                if (statePathName !== windowPathName || stateSearch !== windowSearch || stateHash !== windowHash) {
                    inTimeTravelling = true;
                    let updatedWindowSearch = windowSearch;
                    if (updatedWindowSearch.startsWith('?')) {
                        updatedWindowSearch = updatedWindowSearch.slice(1, updatedWindowSearch.length);
                    }
                    const queryParams = updatedWindowSearch.split('&').reduce((acc, curr) => {
                        const [key, value] = curr.split('=');
                        acc[key] = value;
                        return acc;
                    }, {});
                    router.navigate([statePathName], {queryParams: queryParams});
                } else {
                    inTimeTravelling =  false;
                }
            }

        });
        router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                const { pathname, search, hash } = window.location;
                if (!inTimeTravelling) {
                    inTimeTravelling = false;
                    store.dispatch({
                        type: LOCATION_CHANGE,
                        payload: {
                            location: {
                                pathname,
                                search,
                                hash
                            }
                        }
                    });
                }
            }
        });
    }
    next(action);
};


export function reducer(state = {}, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

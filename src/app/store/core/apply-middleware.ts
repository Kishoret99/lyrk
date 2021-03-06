// (createStore) => (reducer, initialState) => store
export function applyMiddlewares(...middlewares) {
    return (createStore) => (...args) => {
        let store = createStore(...args);
        store.dispatch = middlewares
            .map(middleware => middleware(store))
            .reduce((a, b) => (...args) => a(b(...args)))(store.dispatch.bind(store))
        return store;
    }
}

// middleware syntax 
// (storeAPI) => (next) => (action) => state
// const LoggerMiddeleware = (storeGetter) => (next) => (action)=> {
//     console.log('LOGGER: ', action);
//     return next(action);
//   }
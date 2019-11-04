export const devToolsMiddleware = config => {
    const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
    if(!extension) {
      return (store) => next => action => {
        next(action);
      }
    }
    const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect(config);
    return store => {
      devTools.subscribe(message => {
        switch (message.type) {
          case "ACTION": {
            const action = JSON.parse(message.payload);
            store.dispatch(action);
            devTools.send(action, store.getState());
            break;
          }
          case "DISPATCH": {
            const state = JSON.parse(message.state);
            store.state.next(state);
            break;
          }
          default:
        }
      });
      return next => action => {
        next(action);
        devTools.send(action, store.getState());
      };
    };
};
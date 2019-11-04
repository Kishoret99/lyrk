export const loggerMiddleware = store => next => action => {
    console.log(`%cLOGGER ${action.type}`, 'color: green; font-weight: bold');
    next(action);
};

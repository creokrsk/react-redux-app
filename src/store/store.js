import taskReducer from './task.js';
import { logger } from './middleware/logger.js';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import errorReducer from './errors';
// import { getDefaultMiddleware } from '@reduxjs/toolkit';

// const middlewareEnhancer = applyMiddleware(logger, thunk);

const rootReducer = combineReducers({
  errors: errorReducer,
  tasks: taskReducer,
});

function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
  });
}

// taskReducer,
//   compose(
//     middlewareEnhancer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );

export default createStore;

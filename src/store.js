import logger from 'redux-logger';
// import throttle from 'lodash.throttle';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
// import { loadState, saveState } from './localStorage';

// const persistedState = loadState();

const store = createStore(
  reducers,
  applyMiddleware(logger, thunk),
  composeWithDevTools(),
);

// store.subscribe(throttle(() => saveState(store.getState()), 1000));

export default store;

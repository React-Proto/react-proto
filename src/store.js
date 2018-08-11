import logger from 'redux-logger';
import throttle from 'lodash.throttle';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const store = createStore(
  reducers,
  persistedState,
  compose(
    applyMiddleware(logger, thunk),
    composeWithDevTools(),
  ),
);

store.subscribe(throttle(() => saveState(store.getState()), 1000));

export default store;

import logger from 'redux-logger';
import throttle from 'lodash.throttle';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { saveState } from './localStorage';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(logger, thunk),
    composeWithDevTools(),
  ),
);

store.subscribe(throttle(() => saveState(store.getState()), 1000));

export default store;

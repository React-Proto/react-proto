import logger from 'redux-logger';
import throttle from 'lodash.throttle';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { saveState } from './localStorage';

let composer;

if (process.env.NODE_ENV === 'development') {
  composer = compose(
    applyMiddleware(logger, thunk),
    composeWithDevTools(),
  );
} else {
  composer = compose(applyMiddleware(thunk));
}

const store = createStore(
  reducers,
  composer,
);

store.subscribe(throttle(() => saveState(store.getState()), 1000));

export default store;

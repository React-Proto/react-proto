import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

const store = createStore(
  reducers,
  composeWithDevTools(),
  applyMiddleware(logger),
);

export default store;

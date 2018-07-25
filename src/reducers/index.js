import { combineReducers } from 'redux';

import componentReducer from './componentReducer.js';

const reducers = combineReducers({
  components: componentReducer
})

export default reducers;